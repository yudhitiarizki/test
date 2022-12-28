const express = require("express");
const cors = require('cors');
const router = require('./api/index');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();

const app = express();
const public = __dirname + "/public/";
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public/uploads', express.static(path.join(public, "uploads")));

app.get("/", (req, res) => {
  res.send("Connected to Server");
});

app.use('/', router)

app.listen(port, () => {
  console.log(port, 'Server is open with port!');
})
