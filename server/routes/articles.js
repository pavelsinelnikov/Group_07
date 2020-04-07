const express = require('express');
const articleService = require('../services/articleService');

module.exports = config => {
  console.log(config);
  const router = express.Router();
  const log = config.logger;
  const article = articleService(config.mysql.client);

  router.get('/articles/:id', async (req, res) => {
    try {
      let art = await article.getArticle(req.params.id);
      res.send(art);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/articles', async (req, res) => {
    try {
      var ids = [];
      for (let art of req.body.articles) {
        ids.push(await article.createArticle(art.title, art.url));
      }
      res.send(ids);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/viewArticle', async (req, res) => {
    try {
      await article.incViews(req.body.articleId);
      res.send(true);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  });

  router.post('/checkLink', async (req, res) => {
     var request = require('request');

     request(req.body.url, function(err, response) {
       var isBlocked = 'No';

       // If the page was found...
       if (!err && response.statusCode == 200) {

        // Grab the headers
        var headers = response.headers;

        // Grab the x-frame-options header if it exists
        var xFrameOptions = headers['x-frame-options'] || '';

        // Normalize the header to lowercase
        xFrameOptions = xFrameOptions.toLowerCase();
        // Check if it's set to a blocking option
        if (
          xFrameOptions === 'sameorigin' ||
          xFrameOptions === 'deny'
        ) {
          isBlocked = 'Yes';
        }
       }

       res.send(isBlocked);
     });

  });

  router.get('/popular', async (req, res, next) => {
    try {
      var favorites = [];
      var favCount = await article.getMostFavorited();
      var viewed = await article.getHighestViewed();
      //var userFavorites = await user.getUserFavorites(req.query.userId);

      /*for (const hist of userHistory) {
             viewed.push(await article.getArticle(hist.ArticleId));
          }*/
      favCount.sort(function(a, b) {
        return b.dataValues.numFavs - a.dataValues.numFavs;
      });
      for (const fav of favCount) {
        if (fav.dataValues.articleId) {
          favorites.push(await article.getArticle(fav.dataValues.articleId));
        }
      }
      return res.json({
        viewed,
        favorites
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:id/comments', async (req, res) => {
    try {
      let com = await article.getComments(req.params.id);
      res.send(com);
    } catch (err) {
      return res.send(err);
    }
  });

  router.post('/:id/comments', async (req, res) => {
    try {
      let com = await article.addComment(
        req.params.id,
        req.body.userId,
        req.body.text
      );
      console.log(com);
      res.send(com);
    } catch (err) {
      return res.send(err);
    }
  });

  return router;
};
