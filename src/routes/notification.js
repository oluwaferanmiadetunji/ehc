const express = require('express');
const router = express.Router();
const getNotifications = require('../controllers/getNotifications');
const postNotifications = require('../controllers/postNotifications');
const auth = require('../middlewares/auth');

router.get('/notifications', auth, getNotifications);
router.post('/notifications', postNotifications);

module.exports = router;
