const express = require('express');

const app = express();

const router = require('./api/index')

const PORT = process.env.PORT || 5000;

app.use('/', router);

app.get('/', (req, res) => {
    return res.json({
        mes: 'gg'
    })
})

app.listen(PORT, () => {
    console.log("ok")
})