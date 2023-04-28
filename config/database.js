const Sequelize = require('sequelize');
require('dotenv').config()
console.log('process.env.DATABASE :>>', process.env.DATABASE);

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres'
  }
)

module.exports = sequelize;