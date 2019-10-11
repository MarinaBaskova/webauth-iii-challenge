const jwt = require('jsonwebtoken');
const db = require('../api/routes/users-model');
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	jwt.verify(token, secret, (err, decodedToken) => {
		if (err) {
			// token is not valid or expired
			res.status(401).json({ message: 'Invalid Credentials' });
		} else {
			// the token is valid and we can read the decodedToken
			// db find user by id from decodeddtoken
			db
				.findByID(decodedToken.subject)
				.then((user) => {
					req.user = user;
					next();
				})
				.catch((err) => {
					res.status(500).json(err);
				});

			// req.decodedToken = decodedToken;
		}
	});
};
