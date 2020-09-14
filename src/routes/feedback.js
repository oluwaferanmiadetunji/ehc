const express = require('express');
const router = express.Router();
const sendFeedback = require('../controllers/sendFeedback');
const getFeedbacks = require('../controllers/getFeedbacks');
const deleteFeedback = require('../controllers/deleteFeedback');

router.get('/feedback', getFeedbacks);
router.post('/feedback', sendFeedback);
router.delete('/feedback', deleteFeedback);

module.exports = router;
