const express = require('express');
const db = require('./users-model');
const restricted = require('../../auth/restricted-mw');

const router = express.Router();

// /api/users
router.get('/', restricted, (req, res) => {
	db
		.find(req.user.department)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Users information can not be retrieved' });
		});
});

module.exports = router;
