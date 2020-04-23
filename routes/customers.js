const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { validateCustomer } = require('./../middleware/Helpers');
router.use(express.json());

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

// Routes for showing all Customers
router.get('/', async (req, res) => {
	const customer = await Customer.find().sort('name');
	res.send(customer);
});

// Routes for showing One Customer
router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	//2. If not return a 404 error
	if (!customer) {
		return res.status(404).send('Sorry there is no movie with that id');
	}

	//3. Show the movie based on the ID
	res.send(JSON.stringify(customer));
});

// Create a Customer
router.post('/', async (req, res) => {
	let { name, phone, isGold } = req.body;

	//1. Validate the movie input / parameters from the user
	const { error } = validateCustomer(name, phone, isGold);

	if (error) return res.status(400).send(error.details[0].message);

	//2. Update the list of customers
	let newCustomer = new Customer({ name, phone, isGold });
	newCustomer = await newCustomer.save();
	res.send(newCustomer);
});

// Edit a Customer
router.put('/:id', async (req, res) => {
	let { name, phone, isGold } = req.body;

	//1. Validate the movie input / parameters from the user
	const { error } = validateMovie(name, genre);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{ name, phone, isGold },
		{ new: true },
	);

	if (!customer) return res.status(400).send('The movie ID is not found');
	//2. Update the movie listen

	res.send(JSON.stringify(customer));
});

// DELETE THE CUSTOMER
router.delete('/:id', async (req, res) => {
	//1. Search for the movie
	const customer = await Movie.findByIdAndRemove(req.params.id);

	if (!customer)
		return res.status(404).send('Sorry such a movie does not exist');

	//2. Update the movies
	res.send(JSON.stringify(customer));
});

module.exports = router;
