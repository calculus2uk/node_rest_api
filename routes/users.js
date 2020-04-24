const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateUser } = require('./../middleware/Helpers');
router.use(express.json());

// Create a User
router.post('/', async (req, res) => {
	let { name, email, password } = req.body;

	const { error } = validateUser(name, email, password);
	if (error) return res.status(404).send(error.details[0].message);

	let user = await User.findOne({ email });

	if (user) return res.status(400).send('User already registerd. !!!');

	user = new User({ name, email, password });

	await user.save();

	res.send(user);
});

module.exports = router;
