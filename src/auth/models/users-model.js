'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;
let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};
const sequelize = new Sequelize(DATABASE_URL, options);

const Users = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, Users };
