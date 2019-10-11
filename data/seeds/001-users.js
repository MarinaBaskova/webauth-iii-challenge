const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
	return knex('users').truncate().then(function() {
		return knex('users').insert([
			{ username: 'Anna', department: 'webdev', password: bcrypt.hashSync('hello', 10) },
			{ username: 'David', department: 'sales', password: bcrypt.hashSync('hello', 10) },
			{ username: 'Mark', department: 'webdev', password: bcrypt.hashSync('hello', 10) }
		]);
	});
};
