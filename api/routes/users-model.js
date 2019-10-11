const db = require('../../config/dbConfig');

module.exports = {
	find,
	findByID,
	addNewUser,
	findBy
};

function find(department) {
	return db('users').where({ department }).select('id', 'username', 'department');
}

function findByID(id) {
	return db('users').where({ id }).first();
}

function addNewUser(user) {
	return db('users').insert(user, 'id').then(([ id ]) => {
		const addedUser = findByID(id);
		return addedUser;
	});
}

function findBy(credent) {
	return db('users').where(credent).first();
}
