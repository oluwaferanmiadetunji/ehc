const express = require('express');
const router = express.Router();
const getNurses = require('../controllers/getNurses');
const auth = require('../middlewares/auth');

router.get('/nurses', getNurses);

module.exports = router;
