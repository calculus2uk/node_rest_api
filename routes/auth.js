const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const { validateUserAuth } = require('./../middleware/Helpers');

router.use(express.json());
const jwtPRIVATEKEY = process.env.jwtPRIVATEKEY || 'privateTokenKey';
// Create a User
router.post('/', async (req, res) => {
	let { email, password } = req.body;

	const { error } = validateUserAuth(email, password);
	if (error) return res.status(404).send(error.details[0].message);

	let user = await User.findOne({ email });

	if (!user) return res.status(400).send('Invalid Email or password');

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) return res.status(400).send('Invalid Email or password');

	const token = jwt.sign({ _id: user._id }, jwtPRIVATEKEY);
	res.send(token);
});

module.exports = router;
