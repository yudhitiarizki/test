const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const router = require("./api/index.js.js");

require('dotenv').config();

const app = express();
const public = __dirname + "/public/";
const PORT = process.env.PORT_SERVER || 3002;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public/uploads', express.static(path.join(public, "uploads")));

app.use('/ok', async (res, req) => {
    res.send("Connected to Server");
});

app.get("/", (req, res) => { res.send("Connected to Server"); });

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))