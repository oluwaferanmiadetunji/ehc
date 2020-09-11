const express = require('express');
const router = express.Router();
const getNurses = require('../controllers/getNurses');
const auth = require('../middlewares/auth');

router.get('/nurses', auth, getNurses);

module.exports = router;
