'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { hashPassword } = require('../middleware/basic');

const DATABASE_URL = 'sqlite:memory';
const sequelize = new Sequelize(DATABASE_URL);

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  const hashedPhrase = await hashPassword(user.password);
  user.password = hashedPhrase;
});

module.exports = { sequelize, Users };
