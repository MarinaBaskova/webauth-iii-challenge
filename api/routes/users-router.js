const express = require('express');
const db = require('./users-model');

const router = express.Router();

// /api/users
router.get('/', (req, res) => {
	db
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Users information can not be retrieved' });
		});
});

module.exports = router;
