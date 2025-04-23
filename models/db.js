const { Sequelize } = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(config);

module.exports = sequelize;