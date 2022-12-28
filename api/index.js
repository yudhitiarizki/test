const express = require('express');

const router = express.Router();

const coba = async (req, res) => {
    return res.json({
        mes: 'ok'
    })
};

router.get('/ok', coba);

module.exports = router;