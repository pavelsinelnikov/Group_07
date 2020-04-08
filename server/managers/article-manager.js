const models = require('../models/index.js');

// Module Object
const ArticleManager = function () { };

ArticleManager.createArticle = async function (articleTitle, articleURL) {
  let count = await models.Articles.count({
    where: {
      articleURL: articleURL
    }
  });

  // Check if there are any duplicates
  if (count === 0) {
    await models.Articles.create({
      articleTitle: articleTitle,
      articleURL: articleURL
    });
  }

  return models.Articles.findOne({
    where: {
      articleURL: articleURL
    },
    attributes: ['id']
  });
}

ArticleManager.getArticle = async function (articleId) {
  return models.Articles.findOne({
    where: {
      id: articleId
    }
  });
}

ArticleManager.incViews = async function (articleId) {
  let views = (await getArticle(articleId)).dataValues.articleViews;
  models.Articles.update(
    { articleViews: views + 1 },
    {
      where: {
        id: articleId
      }
    }
  ).then(() => {
    console.log('Done');
  });
}

ArticleManager.getHighestViewed = async function () {
  return models.Articles.findAll({
    limit: 15,
    order: [['articleViews', 'DESC']]
  });
}

ArticleManager.getMostFavorited = async function () {
  return models.UserArticleFavorites.findAll({
    group: ['ArticleId'],
    attributes: [
      'articleId',
      [sequelize.fn('count', sequelize.col('ArticleId')), 'numFavs']
    ]
  });
}

ArticleManager.getComments = async function (articleId) {
  return models.Comments.findAll({
    where: {
      ArticleId: articleId
    },
    include: [
      {
        model: models.RegisteredUsers,
        required: true
      }
    ]
  });
}

ArticleManager.addComment = async function (articleId, userId, text) {
  return await models.Comments.create({
    ArticleId: articleId,
    RegisteredUserId: userId,
    text: text
  });
}

module.exports = ArticleManager;