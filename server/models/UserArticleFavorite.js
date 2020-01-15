module.exports = (sequelize) => {
   const UserArticleFavorites = sequelize.define('UserArticleFavorites');

   return UserArticleFavorites;
};