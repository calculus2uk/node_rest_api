const mongoose = require('mongoose');

// Customer Schema
const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	phone: { type: String, minLength: 6, maxLength: 30, required: true },
	isGold: {
		type: Boolean,
		default: false,
	},
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
