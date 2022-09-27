'use strict';

const express = require('express');
const { basicAuth } = require('./middleware/basic');
const router = express.Router();
const { Users } = require('./models/users-model');
// Signup Route -- create a new user

router.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});
router.get('/signup', async (req, res) => {
  let records = await Users.findAll();
  res.status(200).send(records);
});

// Signin Route -- login with username and password
router.post('/signin', basicAuth, async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
