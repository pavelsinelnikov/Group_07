module.exports = (sequelize) => {
   const UserArticleHistory = sequelize.define('UserArticleHistory');

   return UserArticleHistory;
};