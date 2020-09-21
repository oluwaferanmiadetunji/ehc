const express = require('express');
const multer = require('multer');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const resetPassword = require('../controllers/getUserToken');
const verifyUserToken = require('../controllers/verifyUserToken');

const upload = multer({
	dest: `${process.cwd()}/src/uploads/`,
});

router.post('/user/register', upload.single('image'), createUser);
router.post('/user/login', loginUser);
router.post('/user/update', updateUser);
router.post('/user/verify', resetPassword);
router.post('/user/resetPassword', verifyUserToken);

module.exports = router;
