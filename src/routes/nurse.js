const express = require('express');
const router = express.Router();
const getNurses = require('../controllers/getNurses');
const createNurse = require('../controllers/createNurse');
const loginNurse = require('../controllers/loginNurse');
const updateNurse = require('../controllers/updateNurse');
const resetPassword = require('../controllers/getNurseToken');

const auth = require('../middlewares/auth');

router.post('/nurses', getNurses);
router.post('/nurses/add', createNurse);
router.post('/nurses/login', loginNurse);
router.post('/nurses/update', auth, updateNurse);
router.post('/nurses/resetPassword', resetPassword);

module.exports = router;
