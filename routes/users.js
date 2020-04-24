const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateUser } = require('./../middleware/Helpers');
router.use(express.json());

const jwtPRIVATEKEY = process.env.jwtPRIVATEKEY || 'privateTokenKey';
// Create a new User
router.post('/', async (req, res) => {
	let { name, email, password } = req.body;

	const { error } = validateUser(name, email, password);
	if (error) return res.status(404).send(error.details[0].message);

	let user = await User.findOne({ email });

	if (user) return res.status(400).send('User already registerd. !!!');

	user = new User({ name, email, password });
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();
	const token = jwt.sign({ _id: user._id }, jwtPRIVATEKEY);

	res
		.header('x-auth-token', token)
		.send({ name: user.name, email: user.email });
});

module.exports = router;
