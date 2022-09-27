'use strict';

const { sequelize } = require('./src/auth/models/users-model');
const { start } = require('./src/server');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(start())
  .catch(e => {
    console.error('Could not start server', e.message);
  });

