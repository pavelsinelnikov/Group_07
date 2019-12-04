const express = require('express');
const userRoute = require('./user');

module.exports = config => {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.render('index');
  });

  // Secure that route in real life applications
  router.use('/user', userRoute(config));

  return router;
};
