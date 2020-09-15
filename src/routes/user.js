const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const resetPassword = require('../controllers/getUserToken');

router.post('/user/register', createUser);
router.post('/user/login', loginUser);
router.post('/user/update', updateUser);
router.post('/user/resetPassword', resetPassword);

module.exports = router;
