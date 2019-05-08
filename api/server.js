const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

server.get('/', (req, res) => {
	res.send('Hello World');
});

module.exports = server;
