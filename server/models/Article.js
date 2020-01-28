module.exports = (sequelize, DataTypes) => {
   const Article = sequelize.define('Articles', {
      articleURL: DataTypes.STRING,
      articleTitle: DataTypes.STRING,
      articleViews: {
         type: DataTypes.INTEGER,
         defaultValue: '0'
       },
      articleFavorites: {
        type:DataTypes.INTEGER,
        defaultValue: '0'
      }
   });

   return Article;
};
