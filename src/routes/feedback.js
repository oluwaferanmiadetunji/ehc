const express = require('express');
const router = express.Router();
const sendFeedback = require('../controllers/sendFeedback');

router.post('/feedback', sendFeedback);

module.exports = router;
