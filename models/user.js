const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	email: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 1024,
		unique: true,
	},
});
