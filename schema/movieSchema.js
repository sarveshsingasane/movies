const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	contentId: { type: String, required: false },
	movieName: { type: String, required: true },
	director: { type: String },
	rating: { type: Number },
	genres: { type: Array },
	releaseYear: { type: Number },
	actors: { type: Array },
	language: { type: String },
	duration: { type: String },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
