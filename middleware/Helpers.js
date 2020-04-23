const Joi = require('@hapi/joi');

function validateMovie(name, genre) {
	const schema = Joi.object({
		name: Joi.string().min(6).max(30).required(),
		genre: Joi.string().min(6).max(30).required(),
	});
	return schema.validate({ name, genre });
}

module.exports = validateMovie;
