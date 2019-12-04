const express = require('express');
const userService = require('../../services/userService');

module.exports = config => {
  const router = express.Router();
  const log = config.logger;
  const user = userService(config.mysql.client);

  router.post('/create', async (req, res) => {
    try {
      await user.createUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/addToFavorites', async (req, res) => {
    try {
      var added = await user.toggleFavorite(
        req.body.email,
        req.body.title,
        req.body.url
      );
      res.send(added);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/addToHistory', async (req, res) => {
    try {
      await user.addUserHistory(req.body.result, req.body.email);
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/checkFavorites', async (req, res) => {
    try {
      var favs = [];
      for (var article of req.body.article) {
        var fav = await user.findFavorite(req.body.email, article.result.title);
        favs.push(fav);
      }
      return res.json(favs);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  });

  // router.get('/:userId?', async (req, res, next) => {
  //   try {
  //     const users = await user.getAll();

  //     // The optional userId param was passed
  //     if (req.params.userId) {
  //       var user = await user.getOne(req.params.userId);
  //     }
  //     return res.json({
  //       users
  //     });
  //   } catch (err) {
  //     return next(err);
  //   }
  // });

  router.get('/profile', async (req, res, next) => {
    try {
      var oneUser = await user.getOneByEmail(req.query.email);
      var article = await user.getUserFavorites(req.query.email);

      return res.json({
        oneUser,
        article
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/all', async (req, res, next) => {
    try {
      var allUsers = await user.getAll();

      return res.json({
        allUsers
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/auth', async (req, res) => {
    var username = req.body.email;
    var password = req.body.password;
    if (username && password) {
      var isReturned = await user.authenticate(username, password);

      if (isReturned) {
        res.send(true);
      } else {
        // 'Incorrect Username and/or Password!'
        res.send(false);
      }
      res.end();
    } else {
      // 'Please enter Username and Password!'
      res.send(false);
      res.end();
    }
  });

  // Save or update user
  router.post('/', async (req, res) => {
    const user = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    // Add this here because on update we might want to keep the password as it is
    if (!email || (!password && !req.body.userId)) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please enter email address and password!'
      });
      return res.redirect('/admin/user');
    }
    try {
      // If there was no existing user we now want to create a new user object
      if (!req.body.userId) {
      } else {
        var userData = {};
        if (username) {
          userData.username = username;
        }

        if (email) {
          userData.email = email;
        }

        if (password) {
          userData.password = password;
        }
        await userService.updateUser(req.body.userId, userData);
      }
      req.session.messages.push({
        type: 'success',
        text: 'The user was updated successfully!'
      });
      return res.send(true);
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error while saving the user!'
      });
      log.fatal(err);
      return res.send(false);
    }
  });

  // Delete user
  router.get('/delete/:userId', async (req, res) => {
    try {
      const deleteResult = await userService.remove(req.params.userId);
      if (deleteResult === 0) {
        throw new Error('Result returned zero deleted documents!');
      }
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error while deleting the user!'
      });
      log.fatal(err);
      return res.redirect('/admin/user');
    }
    // Let the user knows that everything went fine
    req.session.messages.push({
      type: 'success',
      text: 'The user was successfully deleted!'
    });
    return res.redirect('/admin/user');
  });

  router.get('/impersonate/:userId', (req, res) => {
    req.session.userId = req.params.userId;
    req.session.messages.push({
      type: 'success',
      text: 'User successfully switched'
    });
    return res.redirect('/admin/user');
  });

  return router;
};
