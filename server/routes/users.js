const express = require('express');
const UserManager = require('../managers/user-manager');
const ArticleManager = require('../managers/article-manager');
//const CommentManager = require('../managers/comment-manager');
const multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: './uploads/images',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({storage: storage});

  const router = express.Router();

  router.get('/users', async (req, res, next) => {
    var users = await UserManager.getAll();

    res.send(users);
  });

  router.post('/users', async (req, res) => {
    try {
      await UserManager.createUser(
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

  router.post('/users/:id/favorites', async (req, res) => {
    try {
      var added = await UserManager.toggleFavorite(
        req.params.id,
        req.body.articleId
      );
      res.send(added);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/users/:id/history', async (req, res) => {
    try {
      await UserManager.createHistory(req.params.id, req.body.articleId);
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.get('/users/:id/favorites', async (req, res) => {
    try {
      var favorites = await UserManager.getUserFavorites(req.params.id);
      res.json(favorites);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  });

  router.get('/users/:id/profile/', async (req, res, next) => {
    try {
      var favorites = [];
      var history = [];
      var user = await UserManager.getUser(req.params.id);
      var userHistory = await UserManager.getUserHistory(req.params.id);

      var userFavorites = await UserManager.getUserFavorites(req.params.id);

      for (const hist of userHistory) {
        history.push(await ArticleManager.getArticle(hist.ArticleId));
      }

      for (const fav of userFavorites) {
        favorites.push(await ArticleManager.getArticle(fav.ArticleId));
      }

      return res.json({
        user,
        history,
        favorites
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/users/:id/upload', upload.single('avatar'), async (req, res, next) => {
    try {
      await UserManager.updateAvatar(req.params.id, req.file.filename);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/users/:id', async (req, res, next) => {
    // var com = await CommentManager.getOne(req.params.id);
    var usr = await UserManager.getOne(com.RegisteredUserId);

    res.send(usr);
  });

  router.post('/users/auth', async (req, res) => {
    var username = req.body.email;
    var password = req.body.password;
    if (username && password) {
      var user = await UserManager.authenticate(username, password);

      if (user) {
        res.send(user);
      } else {
        // 'Incorrect Username and/or Password!'
        res.send(false);
      }
      res.end();
    } else {
      // // 'Please enter Username and Password!'
      // res.send(false);
      // res.end();

      // var userData = {};
      // if (username) {
      //   userData.username = username;
      // }

      // if (email) {
      //   userData.email = email;
      // }
      // if (country) {
      //   userData.country = country;
      // }
      // if (password) {
      //   userData.password = password;
      // }
      // await userService.updateUser(req.body.userId, userData);
    }
    res.send(false);
  });

  router.post('/users', async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
  });

  // Save or update user
  // router.put('/users/:id', async (req, res) => {
  //   const email = req.body.email.trim();
  //   const password = req.body.password.trim();
  //   // Add this here because on update we might want to keep the password as it is
  //   if (!email || (!password && !req.body.userId)) {
  //     req.session.messages.push({
  //       type: 'warning',
  //       text: 'Please enter email address and password!'
  //     });
  //   }
  //   try {
  //     // If there was no existing user we now want to create a new user object
  //     if (req.body.userId) {
  //       var userData = {};
  //       if (username) {
  //         userData.username = username;
  //       }

  //       if (email) {
  //         userData.email = email;
  //       }

  //       if (password) {
  //         userData.password = password;
  //       }
  //       await UserManager.updateUser(req.body.userId, userData);
  //     }
  //     req.session.messages.push({
  //       type: 'success',
  //       text: 'The user was updated successfully!'
  //     });
  //     return res.send(true);
  //   } catch (err) {
  //     req.session.messages.push({
  //       type: 'danger',
  //       text: 'There was an error while saving the user!'
  //     });
  //     log.fatal(err);
  //     res.send(false);
  //   }
  // });

  module.exports = router;

