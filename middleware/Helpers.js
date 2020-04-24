const Joi = require('@hapi/joi');

function validateMovie(name, genre) {
	const schema = Joi.object({
		name: Joi.string().min(6).max(30).required(),
		genre: Joi.string().min(6).max(30).required(),
	});
	return schema.validate({ name, genre });
}

function validateCustomer(name, phone, isGold) {
	const schema = Joi.object({
		name: Joi.string().min(6).max(30).required(),
		phone: Joi.string().min(6).max(30).required(),
		isGold: Joi.bool(),
	});
	return schema.validate({ name, phone, isGold });
}

function validateUser(name, email, password) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().min(3).max(255).required().email(),
		password: Joi.string().min(3).max(1024).required().email(),
	});
	return schema.validate({ name, email, password });
}

module.exports = { validateMovie, validateCustomer, validateUser };
