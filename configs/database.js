const { Client } = require("pg");
require("dotenv").config();
console.log("process.env.DATABASE :>>", process.env.user_name);

// const client = new Client({
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   host: process.env.HOST,s
//   port: process.env.PORT,
// });

const DB_URL = `postgresql://${process.env.user_name}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;
const client = new Client(DB_URL); //Configuring PostgresSQL Database

module.exports = client;
