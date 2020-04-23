const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateMovie = require('./../middleware/Helpers');
router.use(express.json());

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

const Movie = new mongoose.model('Movie', movieShema);
/*const movies = [
	{ id: 1, genre: 'Action', name: 'Die Hard' },
	{ id: 2, genre: 'Commedy', name: 'Wedding Ringer' },
	{ id: 3, genre: 'Thriler', name: 'Pandemic' },
];*/

// Routes for showing all Movies
router.get('/', async (req, res) => {
	const movies = await Movie.find().sort('genre');
	res.send(movies);
});

// Routes for showing One Movie based on ID
router.get('/:id', (req, res) => {
	//1. Check if the movie exist

	const movie = movies.find((movie) => movie.id === id);

	//2. If not return a 404 error
	if (!movie) {
		return res.status(404).send('Sorry there is no movie with that id');
	}

	//3. Show the movie based on the ID
	res.send(JSON.stringify(movie));

	//3. Validate the movie based on ID
	//4. Update the name
	//5. send or return the course
});

// Route for creating a movie
router.post('/', async (req, res) => {
	let { name, genre } = req.body;

	//1. Validate the movie input / parameters from the user
	const { error } = validateMovie(name, genre);

	if (error) return res.status(400).send(error.details[0].message);

	//2. Update the movie listen

	let newMovie = new Movie({ name, genre });
	newMovie = await newMovie.save();
	res.send(newMovie);
});

// Route for Updating a movie
router.put('/:id', async (req, res) => {
	let { name, genre } = req.body;

	//1. Validate the movie input / parameters from the user
	const { error } = validateMovie(name, genre);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{ name, genre },
		{ new: true },
	);

	if (!movie) return res.status(400).send('The movie ID is not found');
	//2. Update the movie listen
	movie.name = name;
	movie.genre = genre;

	res.send(JSON.stringify(movie));
});

// DELETE THE MOVIE
router.delete('/:id', (req, res) => {
	//1. Search for the movie
	const movie = movies.find((movie) => movie.id === +req.params.id);

	if (!movie) return res.status(404).send('Sorry such a course does not exist');

	const index = movies.indexOf(movie);

	movies.splice(index, 1);

	//2. Update the movies
	res.send(JSON.stringify(movies));
});

module.exports = router;
