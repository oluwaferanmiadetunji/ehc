const express = require('express');
const router = express.Router();
const getNotifications = require('../controllers/getNotifications');
const auth = require('../middlewares/auth');

router.get('/notifications', auth, getNotifications);

module.exports = router;
