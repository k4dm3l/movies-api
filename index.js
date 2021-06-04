const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const { config } = require('./config');

const moviesAppRoutes = require('./routes/movies');

const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandler');

app.use(compression());
app.use(helmet());
app.use(express.json());

moviesAppRoutes(app);

// Not Found Handler
app.use(notFoundHandler);

// Error Handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Running http://localhost:${config.port}`)
);
