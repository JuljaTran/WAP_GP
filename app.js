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
import './'
import oAuthModel from "./src/models/oAuthModel.js";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();
const port = 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  const client = new MongoClient(connectionString);
  await client.connect();
  const db = client.db('wap_group_project');

  app.set('db', db);

  //add TTL indexes -expiration dates to remove expired tokens
  db.collection('token').createIndex({ accessTokenExpiresAt: 1}, { expireAfterSeconds: 0});
  db.collection('token').createIndex({ refreshTokenExpiresAt: 1}, { expireAfterSeconds: 0});
  db.collection('token').createIndex({ emailTokenExpiresAt: 1}, { expireAfterSeconds: 0}); //theretisch, wenn es einen emailToken geben würde
  
  const oauth = new ExpressOAuthServer({ model: oAuthModel(db) }); //create oauth middleware
  
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // React-Dev-Server - da andere ports verwendet werden
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

  app.use(express.json());


  //Created Session for testing
  app.use(session({
    secret:'geheim',
    resave: false,
    saveUninitialized: false,
  }));

  //backend routes
  app.use('/api/token', oauth.token({ requireClientAuthentication: {password: false, refresh_token: false }}));
  app.use('/api/register', register);
  app.use('/api', oauth.authenticate(), api)

  /*protected api route
  app.use('/api/auth', auth);
  app.use('/api', api);
  */

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