const express = require("express");
const cors = require('cors');
const router = require('./api/index');
require("dotenv").config();

const connect = require("./schemas");
connect();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected to Server");
});

app.use('/', router)

app.listen(port, () => {
  console.log(port, 'Server is open with port!');
})
