module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    text: DataTypes.STRING
  });

  return Comment;
};
