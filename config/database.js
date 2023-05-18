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

//checking if connection is done
sequelize.authenticate().then(() => {
  console.log(`Database connected successfully`)
}).catch((err) => {
  console.log(err)
})
module.exports = sequelize;