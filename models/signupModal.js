const Sequelize = require('sequelize');
const db = require('../config/database');

const SignUp = db.define('signup', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    isEmail: true, // checks for email format
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: true });

module.exports = SignUp;