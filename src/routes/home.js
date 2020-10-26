const express = require('express');
const router = express.Router();

function homeController(req, res) {
	res.send('Welcome');
}

router.get('/', homeController);

router.get('/register', (req, res) => {
	res.render('index', {
		error: false,
		success: false,
		message: '',
		data: { email: '', name: '', password: '', phone: '' },
	});
});

router.get('/nurses/add', (req, res) => {
	res.render('nurse', {
		error: false,
		success: false,
		message: '',
		data: { email: '', name: '', password: '', type: '', phone: '', location: '', hours: '' },
	});
});

module.exports = router;
