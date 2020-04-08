const express = require('express');
const CommentManager = require('../managers/comment-manager');

  const router = express.Router();

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
