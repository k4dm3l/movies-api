'use strict';

const boom = require('@hapi/boom');
const { config } = require('../../config/index');

function withErrorStack(error, stack) {
  if (config.dev === 'DEVELOPMENT') {
    return { ...error, stack };
  }

  return error;
}

function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}

function wrapErrors(error, req, res, next) {
  !error.isBoom ? next(boom.badImplementation(error)) : next(error);
}

//eslint-disable-next-line
function errorHandler(error, req, res, next) {
  const {
    output: { statusCode, payload },
  } = error;
  res.status(statusCode).json(withErrorStack(payload, error.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
