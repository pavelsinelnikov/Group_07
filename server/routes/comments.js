const express = require('express');
const CommentManager = require('../managers/comment-manager');
const UserManager = require('../managers/user-manager');

  const router = express.Router();

  router.get('/comments/:id/avatar', async (req, res, next) => {
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

  router.put('/comments/:id', async (req, res) => {
    try {
      let com = await CommentManager.editComment(req.params.id, req.body.text);

      res.send(com);
    } catch (err) {
      return res.send(err);
    }
  });

  router.delete('/comments/:id', async (req, res) => {
    try {
      let com = await CommentManager.deleteComment(req.params.id);

      if (com > 0) res.send('success');
    } catch (err) {
      return res.send(err);
    }
  });

  module.exports = router;
