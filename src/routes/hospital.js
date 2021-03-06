const express = require('express');
const router = express.Router();
const getHospitals = require('../controllers/getHospitals');
const createHospital = require('../controllers/createHospital');
const auth = require('../middlewares/auth');

router.post('/hospitals', getHospitals);
router.post('/hospitals/add', createHospital);

module.exports = router;
