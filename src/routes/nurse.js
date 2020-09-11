const express = require('express');
const router = express.Router();
const getNurses = require('../controllers/getNurses');
const createNurse = require('../controllers/createNurse');

const auth = require('../middlewares/auth');

router.post('/nurses', auth, getNurses);
router.post('/nurses/add', createNurse);

module.exports = router;
