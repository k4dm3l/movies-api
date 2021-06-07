'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MovieServices = proxyquire('../services/movies.js', {
    '../lib/mongo.js': MongoLibMock,
  });

  const movieServices = new MovieServices();

  describe('when getMovies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await movieServices.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await movieServices.getMovies({});
      assert.deepStrictEqual(result, moviesMock);
    });
  });
});
