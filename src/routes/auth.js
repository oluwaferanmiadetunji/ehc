const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const createUser = require('../controllers/createUser');

router.post('/user/register', createUser);
router.post('/user/login', loginUser);

module.exports = router;
