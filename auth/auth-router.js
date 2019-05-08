const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../api/routes/users-model');
const router = express.Router();
const secret = process.env.SECRET;
// /api/auth

router.post('/register', (req, res) => {
	const newUser = req.body;

	if (
		!newUser.hasOwnProperty('username') ||
		!newUser.hasOwnProperty('department') ||
		!newUser.hasOwnProperty('password')
	) {
		res.status(400).json({ error: 'Please provide name and password and department for the user' });
	}

	const hash = bcrypt.hashSync(newUser.password, 10);
	newUser.password = hash;
	db
		.addNewUser(newUser)
		.then((addedUser) => {
			res.status(201).json(addedUser);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The was an error while saving new user', err });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	db
		.findBy({ username })
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user); // <<<<<<<<<<<<<<<<<<<<<<<< SET TOKEN
				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The was an error while trying to login', err });
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department
	};
	const options = {
		expiresIn: '1h'
	};

	return jwt.sign(payload, secret, options);
}

module.exports = router;
