'use strict';

const joi = require('joi');

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createMovieSchema = joi.object().keys({
  title: joi.string().max(80).required(),
  year: joi.number().min(1888).max(2077).required(),
  cover: joi.string().uri().required(),
  description: joi.string().max(300).required(),
  duration: joi.number().min(1).max(500).required(),
  contentRating: joi.string().max(5).required(),
  source: joi.string().uri().required(),
  tags: joi.array().items(joi.string().max(50)),
});

const updateMovieSchema = joi.object().keys({
  title: joi.string().max(80),
  year: joi.number().min(1888).max(2077),
  cover: joi.string().uri(),
  description: joi.string().max(300),
  duration: joi.number().min(1).max(500),
  contentRating: joi.string().max(5),
  source: joi.string().uri(),
  tags: joi.array().items(joi.string().max(50)),
});

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};
