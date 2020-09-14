const express = require('express');
const router = express.Router();
const sendFeedback = require('../controllers/sendFeedback');
const getFeedbacks = require('../controllers/getFeedbacks');

router.get('/feedback', getFeedbacks);
router.post('/feedback', sendFeedback);

module.exports = router;
