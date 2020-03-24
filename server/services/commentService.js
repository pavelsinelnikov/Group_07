const Models = require('../models');

var sequelize = require('sequelize');

let models = null;

async function getOne(commentId) {
  return await models.Comments.findOne({
    where: {
      id: commentId
    }//,
    //include: [RegisteredUsers]
  });
}

async function editComment(commentId, text) {
  return await models.Comments.update(
    { text: text },
    {
      where: {
        id: commentId
      }
    }
  );
}

async function deleteComment(commentId) {
  return await models.Comments.destroy({
    where: {
      id: commentId
    }
  });
}

module.exports = _client => {
  models = Models(_client);
  client = _client;

  return {
    getOne,
    editComment,
    deleteComment
    //createArticleHistory,
    //createArticleFavorite
  };
};
