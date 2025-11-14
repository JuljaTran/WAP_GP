//file 
import cors from "cors";
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import api from "./src/routing/api.js";
import auth from "./src/routing/auth.js";
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();
const port = 1234;

try {
  const client = new MongoClient(connectionString);
  await client.connect();
  const db = client.db('wap_group_project');

  app.set('db', db);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // React-Dev-Server - da andere ports verwendet werden
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

  app.use(express.json());

  app.use(session({
    secret:'geheim',
    resave: false,
    saveUninitialized: false,
  }));

  //protected api route
  app.use('/api/auth', auth);
  app.use('/api', api);

  app.use(express.static('dist'));
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

} catch (err) {
  console.log(err);
}