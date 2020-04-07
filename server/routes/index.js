const express = require('express');
const userRoute = require('./users');
const articleRoute = require('./articles');
const commentRoute = require('./comments');

module.exports = config => {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.render('index');
  });

  // Secure that route in real life applications
  router.use('/user', userRoute(config));
  router.use('/article', articleRoute(config));
  router.use('/comment', commentRoute(config));

  return router;
};
