const express = require('express');
const articleService = require('../../services/articleService');

module.exports = config => {
   const router = express.Router();
   const log = config.logger;
   const article = articleService(config.mysql.client);

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

   return router;
};