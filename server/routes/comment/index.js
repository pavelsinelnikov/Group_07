const express = require('express');
const commentService = require('../../services/commentService');

module.exports = config => {
  const router = express.Router();
  const log = config.logger;
  const comment = commentService(config.mysql.client);

  router.put('/comments/:id', async (req, res) => {
    try {
      let com = await comment.editComment(req.params.id, req.body.text);

      res.send(com);
    } catch (err) {
      return res.send(err);
    }
  });

  router.delete('/comments/:id', async (req, res) => {
    try {
      let com = await comment.deleteComment(req.params.id);

      if (com > 0) res.send('success');
    } catch (err) {
      return res.send(err);
    }
  });

  return router;
};
