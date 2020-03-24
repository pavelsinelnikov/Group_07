module.exports = (sequelize, DataTypes) => {
   const RegisteredUsers = sequelize.define('RegisteredUsers', {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      country: DataTypes.STRING,
      avatar: DataTypes.STRING
   });
   return RegisteredUsers;
};
