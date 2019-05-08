const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const usersRouter = require('../api/routes/users-router');

server.use(helmet());
server.use(express.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.send('Hello World');
});

module.exports = server;
