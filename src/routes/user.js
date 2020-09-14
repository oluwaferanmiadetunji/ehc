const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');

router.post('/user/register', createUser);
router.post('/user/login', loginUser);
router.post('/user/update', updateUser);

module.exports = router;
