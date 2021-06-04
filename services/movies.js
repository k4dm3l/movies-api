'use strict';

const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.dbConnection = new MongoLib();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.dbConnection.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this.dbConnection.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ newMovie }) {
    const createdMovieId = await this.dbConnection.create(
      this.collection,
      newMovie
    );
    return createdMovieId.toString();
  }

  async updateMovie({ movieId, updateMovie }) {
    const updatedMovieId = await this.dbConnection.update(
      this.collection,
      movieId,
      updateMovie
    );
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.dbConnection.delete(
      this.collection,
      movieId
    );
    return deletedMovieId;
  }
}

module.exports = MoviesService;
