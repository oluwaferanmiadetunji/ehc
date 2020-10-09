const express = require('express');
const router = express.Router();
const multer = require('multer');
const getNurses = require('../controllers/getNurses');
const createNurse = require('../controllers/createNurse');
const loginNurse = require('../controllers/loginNurse');
const updateNurse = require('../controllers/updateNurse');
const resetPassword = require('../controllers/getNurseToken');
const verifyNurseToken = require('../controllers/verifyNurseToken');

const upload = multer({
	dest: `${process.cwd()}/src/uploads/`,
});

router.post('/nurses', getNurses);
router.post('/nurses/add', upload.single('image'), createNurse);
router.post('/nurses/login', loginNurse);
router.post('/nurses/update', updateNurse);
router.post('/nurses/verify', resetPassword);
router.post('/nurses/resetPassword', verifyNurseToken);

module.exports = router;
