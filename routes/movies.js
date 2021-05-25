const { Router } = require('express');
const { moviesMock } = require('../utils/mocks/movies');

function moviesAppRoutes(app) {
  const router = Router();

  app.use('/api/movies', router);

  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: movies,
        message: 'movies retrieved'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0].id);

      res.status(201).json({
        data: movies,
        message: 'movie created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: movies,
        message: 'movies updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: movies,
        message: 'movies deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesAppRoutes;
