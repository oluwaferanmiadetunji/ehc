const http = require('http');
const {port} = require('./config');
const connection = require('./db');
const app = require('./app');

const server = http.createServer(app);

connection.on('open', () => {
	console.log('Connection to MongoDB Atlas established successfully');
});

server.listen(port, () => console.log('Server running at port: ', port));
