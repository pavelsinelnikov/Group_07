const models = require('../models/index.js');

// Module Object
const CommentManager = function () { };

CommentManager.getOne = async function (commentId) {
  return await models.Comments.findOne({
    where: {
      id: commentId
    }//,
    //include: [RegisteredUsers]
  });
}

CommentManager.editComment = async function (commentId, text) {
  return await models.Comments.update(
    { text: text },
    {
      where: {
        id: commentId
      }
    }
  );
}

CommentManager.deleteComment = async function (commentId) {
  return await models.Comments.destroy({
    where: {
      id: commentId
    }
  });
}

module.exports = CommentManager;
