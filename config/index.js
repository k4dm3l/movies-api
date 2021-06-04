require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV || 'DEVELOPMENT',
  port: process.env.PORT || 3000,
  cors: process.env.CORS || '*',
  dbName: process.env.MONGO_DB_NAME,
  dbUser: process.env.MONGO_DB_USERNAME,
  dbPassword: process.env.MONGO_DB_PASSWORD,
  dbHost: process.env.MONGO_DB_HOST,
};

module.exports = { config };
