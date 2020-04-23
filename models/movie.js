const mongoose = require('mongoose');

const movieShema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	genre: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
});

module.exports = mongoose.model('Movie', movieShema);
