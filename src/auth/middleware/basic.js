'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('../models/users-model');

let hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

Users.beforeCreate(async (user) => {
  const hashedPhrase = await hashPassword(user.password);
  user.password = hashedPhrase;
});

let basicAuth = async (req, res, next) => {
  let encodedString = req.headers.authorization.split(' ').pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  try {
    const user = await Users.findOne({ where: { username } });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        req.user = user;
        return next();
      }
    }
    throw new Error('Invalid Login');
  } catch (error) {
    next('Invalid Login');
  }

};

module.exports = { hashPassword, basicAuth };
