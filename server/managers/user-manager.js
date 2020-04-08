const models = require('../models');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

// Module Object
const UserManager = function () { };

// Find all users
UserManager.getAll = async function () {
  return models.RegisteredUsers.findAll();
}

UserManager.getOne = async function (userId) {
  return models.RegisteredUsers.findOne({
    where: {
      id: userId
    }
  });
}

UserManager.getOneByEmail = async function (email) {
  return models.RegisteredUsers.findOne({
    where: {
      email: email
    }
  });
}

// Create a new user
UserManager.createUser = async function (username, email, country, password) {
  // Note: using `force: true` will drop the table if it already exists
  let count = await models.RegisteredUsers.count({
    where: {
      email: email
    }
  });

  // If user does not exist
  if (count !== 0) {
    throw 'User already exists';
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
    if (err) console.log(err);
    // hash the password using our new salt
    bcrypt.hash(password, salt, (hasherr, hash) => {
      if (hasherr) console.log(hasherr);
      // override the cleartext password with the hashed one
      models.RegisteredUsers.sync().then(() => {
        // Now the `users` table in the database corresponds to the model definition

        models.RegisteredUsers.create({
          username: username,
          email: email,
          country: country,
          password: hash
        });
      });
    });
  });
}

UserManager.createHistory = async function (userId, articleId) {
    models.UserArticleHistory.create({
      RegisteredUserId: userId,
      ArticleId: articleId
    });
}

UserManager.authenticate = async function (email, plainTextPassword) {
  let user = await models.RegisteredUsers.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    if (await bcrypt.compare(plainTextPassword, user.password)) {
      return user;
    }
  } else {
    return null;
  }

  return null;
}

UserManager.getUser = async function (userId) {
  return models.RegisteredUsers.findOne({
    where: {
      id: userId
    }
  });
}

UserManager.createFavorite = async function (userId, articleId) {
  models.UserArticleFavorites.sync().then(() => {
    models.UserArticleFavorites.create({
      RegisteredUserId: userId,
      ArticleId: articleId
    });
  });
}

UserManager.removeFavorite = async function (userId, articleId) {
  models.UserArticleFavorites.sync().then(() => {
    models.UserArticleFavorites.destroy({
      where: {
        RegisteredUserId: userId,
        ArticleId: articleId
      }
    });
  });
}

UserManager.findFavorite = async function (userId, articleId) {
  return models.UserArticleFavorites.findOne({
    where: {
      RegisteredUserId: userId,
      ArticleId: articleId
    }
  });
}

UserManager.toggleFavorite = async function (userId, articleId) {
  if (await UserManager.findFavorite(userId, articleId)) {
    UserManager.removeFavorite(userId, articleId);
    return false;
  } else {
    UserManager.createFavorite(userId, articleId);
    return true;
  }
}

UserManager.getUserFavorites = async function (userId) {
  return models.UserArticleFavorites.findAll({
    where: {
      RegisteredUserId: userId
    }
  });
}

UserManager.getUserHistory = async function (userId) {
  return models.UserArticleHistory.findAll({
    where: {
      RegisteredUserId: userId
    }
  });
}

UserManager.updateAvatar = async function (id, file) {
  models.RegisteredUsers.update(
    { avatar: file },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    console.log('Done');
  });
}

module.exports = UserManager;
