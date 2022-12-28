const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

const router = require('./api/index')

const PORT = process.env.PORT || 5000;
const public = __dirname + "/public/";

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public/uploads', express.static(path.join(public, "uploads")));

app.use('/', router);

app.get('/', (req, res) => {
    return res.json({
        mes: 'gg'
    })
})

app.listen(PORT, () => {
    console.log("ok")
})