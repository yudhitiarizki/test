const express = require('express');

const router = express.Router();
const { getUsers } = require('../controllers/Users')

router.get('/ok', getUsers);

module.exports = router;