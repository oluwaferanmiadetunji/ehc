const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoutes = require('../routes/auth');
const home = require('../routes/home');
const notification = require('../routes/notification');
const feedback = require('../routes/feedback');
const nurse = require('../routes/nurse');
const hospital = require('../routes/hospital');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

let morganFunction = function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
	].join(' ');
};
app.use(morgan(morganFunction));

app.use('/', home);
app.use('/', authRoutes);
app.use('/', notification);
app.use('/', feedback);
app.use('/', nurse);
app.use('/', hospital);

module.exports = app;
