const express = require('express');
const UserManager = require('../managers/user-manager');
const ArticleManager = require('../managers/article-manager');
const CommentManager = require('../managers/comment-manager');
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
    var usr = await UserManager.getAll();

    res.send(usr);
  });

  router.post('/users', async (req, res) => {
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

  router.post('/users/favorites', async (req, res) => {
    try {
      var added = await UserManager.toggleFavorite(
        req.body.userId,
        req.body.articleId
      );
      res.send(added);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/users/history', async (req, res) => {
    try {
      await UserManager.createHistory(req.body.userId, req.body.articleId);
      res.send(true);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/users/checkFavorites', async (req, res) => {
    try {
      var fav = await UserManager.getUserFavorites(req.body.userId);
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

  router.post('/users/upload', upload.single('avatar'), async (req, res, next) => {
    try {
      await user.updateAvatar(req.body.userId, req.file.filename);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/users/avatar/:id', async (req, res, next) => {
    try {
      var com = await CommentManager.getOne(req.params.id);
      var account = await UserManager.getUser(com.dataValues.RegisteredUserId);
      if (account.dataValues.avatar == null){
        account.dataValues.avatar = 'user.png';
      }
      res.type('png').sendFile('uploads/images/'+account.dataValues.avatar , { root : './'});
    } catch (err) {
      return next(err);
    }
  });

  

  router.get('/users/:id', async (req, res, next) => {
    var com = await CommentManager.getOne(req.params.id);
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
        await UserManager.updateUser(req.body.userId, userData);
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
      const deleteResult = await UserManager.remove(req.params.userId);
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

  module.exports = router;

