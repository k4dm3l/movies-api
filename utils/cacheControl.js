'use strict';

const { config } = require('../config');

function cacheResponse(res, seconds) {
  if (!config.dev || config.dev !== 'DEVELOPMENT') {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = {
  cacheResponse,
};
