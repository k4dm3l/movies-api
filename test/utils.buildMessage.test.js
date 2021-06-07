'use strict';

const assert = require('assert');
const { buildMessage } = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
  describe('When receives an entity and an action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create');
      assert.strictEqual(result, 'movie created');
    });
  });

  describe('When receives an entity and an action and is a list', () => {
    it('should return  the respective message with the entity in plural', () => {
      const result = buildMessage('movie', 'list');
      assert.strictEqual(result, 'movies listed');
    });
  });
});
