'use strict';

require('dotenv').config();
const express = require('express');
const router = require('./auth/router');

const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3002;

app.use(router);
app.use('*',notFound);
console.log('in server');
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
module.exports = { app, start };
