const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const home = require('./routes/home');
const MONGO_DB_URL =
	process.env.MONGO_DB_URL || 'mongodb://localhost/videoStore';

console.log(process.env);

// create a connection to mongoose
mongoose
	.connect(MONGO_DB_URL)
	.then(() => console.log('mongodb is connected'))
	.catch(() => console.log('mongodb is not connected'));

const app = express();

app.use(express.json());

app.use('/api/movies', movies);
app.use('/', home);

app.listen(3000, () => console.log('App running on port 3000'));
