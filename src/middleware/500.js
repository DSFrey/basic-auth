'use strict';

module.exports = (error, req, res) => {
  res.status(500).send({
    error: 500,
    route: req.originalUrl,
    query: req.query,
    body: req.body,
    message: `SERVER ERROR: ${error.message}`,
  });
};
