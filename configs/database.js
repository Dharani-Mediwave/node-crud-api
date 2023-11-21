const { Client} = require('pg')
require('dotenv').config()
console.log('process.env.DATABASE :>>', process.env.DATABASE);

// const client = new Client({
//   user:  process.env.USERNAME,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
//   host: process.env.HOST,
// })

const DB_URL = `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`
const client = new Client(DB_URL); //Configuring PostgresSQL Database


module.exports = client;
