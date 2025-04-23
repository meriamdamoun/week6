const { Sequelize } = require('sequelize');

const dbConfig = {
  database: process.env.DB_NAME || 'book_api',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: process.env.DB_STORAGE || './database.sqlite'
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: false
  }
);