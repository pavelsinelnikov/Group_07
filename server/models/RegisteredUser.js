module.exports = (sequelize, DataTypes) => {
  const RegisteredUsers = sequelize.define('RegisteredUsers', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    country: DataTypes.STRING,
    password: DataTypes.STRING,
    history: {
      type: DataTypes.STRING(7000),
      allowNull: true,
      defaultValue: null,
      get() {
        var history = this.getDataValue('history');
        if (history != null) {
          if (String(history).includes(';')) {
            return history.split(';');
          } else {
            return [history];
          }
        }
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('history', val.join(';'));
        } else {
          this.setDataValue('history', val);
        }
      }
    },
    favorites: {
      type: DataTypes.STRING(7000),
      allowNull: true,
      defaultValue: null,
      get() {
        var favorites = this.getDataValue('favorites');
        if (favorites != null) {
          if (String(favorites).includes(';')) {
            return favorites.split(';');
          } else {
            return [favorites];
          }
        }
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('favorites', val.join(';'));
        } else {
          this.setDataValue('favorites', val);
        }
      }
    }
  });

  return RegisteredUsers;
};
