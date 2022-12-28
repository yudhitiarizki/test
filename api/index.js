const express = require('express');

const router = express.Router();

router.get('y', async (req, res) => {
    return res.json({
        mes: 'ok'
    })
})

module.exports = router;