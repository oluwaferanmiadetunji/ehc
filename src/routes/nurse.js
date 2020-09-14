const express = require('express');
const router = express.Router();
const getNurses = require('../controllers/getNurses');
const createNurse = require('../controllers/createNurse');
const loginNurse = require('../controllers/loginNurse');

const auth = require('../middlewares/auth');

router.post('/nurses', getNurses);
router.post('/nurses/add', createNurse);
router.post('/nurses/login', loginNurse);

module.exports = router;
