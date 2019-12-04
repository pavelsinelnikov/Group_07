module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    email: DataTypes.STRING,
    articleTitle: DataTypes.STRING,
    articleURL: DataTypes.STRING
  });

  return Favorites;
};
