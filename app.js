const express = require('express');

const movies = require('./routes/movies');
const home = require('./routes/home');

const app = express();

app.use(express.json());

app.use('/api/movies', movies);
app.use('/', home);

app.listen(3000, () => console.log('App running on port 3000'));
