const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello to my video Store');
});

module.exports = router;
