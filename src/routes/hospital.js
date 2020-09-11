const express = require('express');
const router = express.Router();
const getHospitals = require('../controllers/getHospitals');
const auth = require('../middlewares/auth');

router.get('/hospitals', auth, getHospitals);

module.exports = router;
  