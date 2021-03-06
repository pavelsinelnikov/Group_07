const express = require('express');
const userRoute = require('./users');
const articleRoute = require('./articles');
const commentRoute = require('./comments');

  const router = express.Router();

  // Secure that route in real life applications
  router.use(userRoute);
  router.use(articleRoute);
  router.use(commentRoute);

  module.exports = router;

