const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const user = require('../routes/user');
const notification = require('../routes/notification');
const feedback = require('../routes/feedback');
const nurse = require('../routes/nurse');
const hospital = require('../routes/hospital');
const home = require('../routes/home');

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }));
app.use(helmet());
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'ejs');

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

app.use('/', user);
app.use('/', notification);
app.use('/', feedback);
app.use('/', nurse);
app.use('/', hospital);
app.use('/', home);

module.exports = app;
