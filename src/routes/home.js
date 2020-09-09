const express = require('express');
const router = express.Router();

function homeController(req, res) {
	res.send('Welcome');
}

router.get('/', homeController);

module.exports = router;
