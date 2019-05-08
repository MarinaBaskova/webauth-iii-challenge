exports.seed = function(knex, Promise) {
	return knex('users').truncate().then(function() {
		return knex('users').insert([
			{ username: 'Anna', department: 'webdev', password: 'hello' },
			{ username: 'David', department: 'sales', password: 'hello' },
			{ username: 'Mark', department: 'webdev', password: 'hello' }
		]);
	});
};
