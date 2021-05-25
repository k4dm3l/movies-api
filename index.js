const express = require('express');

const app = express();

const { config } = require('./config');

const moviesAppRoutes = require('./routes/movies');

moviesAppRoutes(app);

app.listen(config.port, () =>
  console.log(`Running http://localhost:${config.port}`)
);
