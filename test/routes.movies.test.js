'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const { testServer } = require('../utils/testServer');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies.js', {
    '../services/movies.js': MoviesServiceMock,
  });

  const request = testServer(route);

  describe('GET movies', () => {
    it('Should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('Should respond with a list of movies', (done) => {
      request.get('/api/movies').end((err, respoonse) => {
        assert.deepStrictEqual(respoonse.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });
  });
});
