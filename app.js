import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import api from "./src/routing/api.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 1234


app.use(express.json())
app.use('/api', api)

app.use(express.static('dist'));
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});