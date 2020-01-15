module.exports = (sequelize, DataTypes) => {
   const Article = sequelize.define('Articles', {
      articleURL: DataTypes.STRING,
      articleTitle: DataTypes.STRING
   });

   return Article;
};