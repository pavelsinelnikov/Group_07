const Models = require('../models');

var sequelize = require('sequelize');

let models = null;

async function createArticle(articleTitle, articleURL) {
   let count = await models.Articles.count({
      where: {
         articleURL: articleURL
      }
   })

   // Check if there are any duplicates
   if (count === 0) {
      await models.Articles.create({
         articleTitle: articleTitle,
         articleURL: articleURL
      })
   }

   return models.Articles.findOne({
      where: {
         articleURL: articleURL
      },
      attributes: ['id']

   })
}

async function getArticle(articleId) {
   return models.Articles.findOne({
      where: {
         id: articleId
      }
   })
}

async function incViews(articleId){
   let views = (await getArticle(articleId)).dataValues.articleViews;
   models.Articles.update({ articleViews: views+1 }, {
      where: {
         id: articleId
      }
   }).then(() => {
      console.log('Done');
   });
}

async function getHighestViewed(){
  return models.Articles.findAll({
    limit: 15,
    order: [
      ['articleViews', 'DESC']
    ]
  });
}

async function getMostFavorited(){
  return models.UserArticleFavorites.findAll({
    group: ['ArticleId'],
    attributes: ['articleId', [sequelize.fn('count', sequelize.col('ArticleId')), 'numFavs']],
  });
}

// async function createArticleHistory(articleId, userId) {
//    models.UserArticleHistory.create({
//       articleTitle: articleTitle,
//       articleURL: articleURL
//    });
// }

// async function createArticleFavorite(articleId, userId) {
//    models.UserArticleFavorite.create({
//       articleId: articleId,
//       userId: userId
//    });

// }

module.exports = _client => {
   models = Models(_client);
   client = _client;

   return {
      createArticle,
      getArticle,
      incViews,
      getHighestViewed,
      getMostFavorited
      //createArticleHistory,
      //createArticleFavorite
   };
}
