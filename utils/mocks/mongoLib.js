'use strict';

const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

// Movies Service GET ALL stub
const getAllStub = sinon.stub();

getAllStub.withArgs('movies').resolves(moviesMock);

// Movies Service GET ALL filtered by tags stub
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

// Movies Service CREATE stub
const createStub = sinon.stub();
createStub.resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};
