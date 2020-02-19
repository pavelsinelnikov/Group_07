const express = require('express');
const userService = require('../../services/userService');
const articleService = require('../../services/articleService');
const commentService = require('../../services/commentService');

module.exports = config => {
  const router = express.Router();
  const log = config.logger;
  const user = userService(config.mysql.client);
  const comment = commentService(config.mysql.client);
  const article = articleService(config.mysql.client);

  router.post('/create', async (req, res) => {
    try {
      await user.createUser(
        req.body.username,
        req.body.email,
        req.body.country,
        req.body.password
      );
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/favorites', async (req, res) => {
    try {
      var added = await user.toggleFavorite(
        req.body.userId,
        req.body.articleId
      );
      res.send(added);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/history', async (req, res) => {
    try {
      await user.createHistory(req.body.userId, req.body.articleId);
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/checkFavorites', async (req, res) => {
    try {
      var fav = await user.getUserFavorites(req.body.userId);
      res.json(fav);
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
      var favorites = [];
      var history = [];
      var oneUser = await user.getUser(req.query.userId);
      var userHistory = await user.getUserHistory(req.query.userId);

      var userFavorites = await user.getUserFavorites(req.query.userId);

      for (const hist of userHistory) {
        history.push(await article.getArticle(hist.ArticleId));
      }

      for (const fav of userFavorites) {
        favorites.push(await article.getArticle(fav.ArticleId));
      }

      return res.json({
        oneUser,
        history,
        favorites
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

  router.get('/users/:id', async (req, res, next) => {
    var com = await comment.getOne(req.params.id);
    var usr = await user.getOne(com.RegisteredUserId);

    res.send(usr);
  });

  router.post('/auth', async (req, res) => {
    var username = req.body.email;
    var password = req.body.password;
    if (username && password) {
      var userId = await user.authenticate(username, password);

      if (userId) {
        res.status(200).send(userId.toString());
      } else {
        // 'Incorrect Username and/or Password!'
        res.send(false);
      }
      res.end();
    } else {
      // 'Please enter Username and Password!'
      res.send(false);
      res.end();

      var userData = {};
      if (username) {
        userData.username = username;
      }

      if (email) {
        userData.email = email;
      }
      if (country) {
        userData.country = country;
      }
      if (password) {
        userData.password = password;
      }
      await userService.updateUser(req.body.userId, userData);
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
      if (req.body.userId) {
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
