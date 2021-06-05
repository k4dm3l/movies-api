'use strict';

const { Router } = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const { validationHandler } = require('../utils/middlewares/validationHandler');

function moviesAppRoutes(app) {
  const router = Router();
  const moviesService = new MoviesService();

  app.use('/api/movies', router);

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:movieId',
    validationHandler(movieIdSchema, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;

      try {
        const movie = await moviesService.getMovie({ movieId });

        res.status(200).json({
          data: movie,
          message: 'movies retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: newMovie } = req;

      try {
        const movie = await moviesService.createMovie({ newMovie });

        res.status(201).json({
          data: movie,
          message: 'movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler(movieIdSchema, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: updateMovie } = req;

      try {
        const movie = await moviesService.updateMovie({ movieId, updateMovie });

        res.status(200).json({
          data: movie,
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler(movieIdSchema, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;

      try {
        const movie = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: movie,
          message: 'movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesAppRoutes;
