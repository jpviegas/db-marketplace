import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';

dotenv.config()

const app = express()

app.use(cors({
  credentials: true
}));

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
  console.log('server running on http://localhost:8080/');
})

const MONGO_ADM = process.env.MONGODB_ADM
const MONGO_PASS = process.env.MONGODB_PASS
const MONGO_URL = `mongodb+srv://${MONGO_ADM}:${MONGO_PASS}@marketplace.drvn9ty.mongodb.net/Market_db?retryWrites=true&w=majority`
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => { console.error(error); })

app.use('/', router())
