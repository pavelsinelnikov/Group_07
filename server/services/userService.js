const Models = require('../models');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

let client = null;
let models = null;

// Find all users
async function getAll() {
  return models.RegisteredUsers.findAll();
  //.then(users => {
  //   console.log('All users:', JSON.stringify(users, null, 4));
  // });
}

async function getOne(userId) {
  return models.RegisteredUsers.findOne({
    where: {
      id: userId
    }
  });
}

async function getOneByEmail(email) {
  return models.RegisteredUsers.findOne({
    where: {
      email: email
    }
  });
}

// Create a new user
async function createUser(username, email, country, password) {
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

// // Append user history
// async function addUserHistory(result, email) {
//    var tempResult = result;
//    // delete tempResult.description;
//    // delete tempResult.content;
//    // delete tempResult.urlToImage;
//    // delete tempResult.publishedAt;
//    // delete tempResult.updatedAt;
//    // delete tempResult.source;
//    // delete tempResult.author;
//    // Note: using `force: true` will drop the table if it already exists
//    var user = await models.RegisteredUsers.findOne({
//       where: {
//          email: email
//       }
//    });

//    // If user does not exist
//    if (user == null) {
//       throw 'User does not exist!';
//    }

//    var tempUserHistory = user.history;

//    models.RegisteredUsers.sync().then(() => {
//       // Now the `users` table in the database corresponds to the model definition
//       if (tempUserHistory == null) {
//          models.RegisteredUsers.update({
//             history: JSON.stringify(tempResult)
//          }, { where: { id: user.id } });
//       } else {
//          tempUserHistory.push(JSON.stringify(tempResult));
//          models.RegisteredUsers.update({
//             history: tempUserHistory
//          }, { where: { id: user.id } });
//       }
//    });
// }

async function createHistory(userId, articleId) {
  models.UserArticleHistory.sync().then(() => {
    models.UserArticleHistory.create({
      RegisteredUserId: userId,
      ArticleId: articleId
    });
  });
}

// Delete everyone named "Jane"
async function deleteUser() {
  models.RegisteredUsers.destroy({
    where: {
      firstName: 'Jane'
    }
  }).then(() => {
    console.log('Done');
  });
}

// Change everyone without a last name to "Doe"
async function updateUser() {
  models.RegisteredUsers.update(
    { lastName: 'Doe' },
    {
      where: {
        lastName: null
      }
    }
  ).then(() => {
    console.log('Done');
  });
}

async function authenticate(email, plainTextPassword) {
  let user = await models.RegisteredUsers.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    if (await bcrypt.compare(plainTextPassword, user.password)) {
      return user.id;
    }
  } else {
    return null;
  }

  return null;
}

async function getUser(userId) {
  return models.RegisteredUsers.findOne({
    where: {
      id: userId
    }
  });
}

async function createFavorite(userId, articleId) {
  models.UserArticleFavorites.sync().then(() => {
    models.UserArticleFavorites.create({
      RegisteredUserId: userId,
      ArticleId: articleId
    });
  });
}

async function removeFavorite(userId, articleId) {
  models.UserArticleFavorites.sync().then(() => {
    models.UserArticleFavorites.destroy({
      where: {
        RegisteredUserId: userId,
        ArticleId: articleId
      }
    });
  });
}

async function findFavorite(userId, articleId) {
  return models.UserArticleFavorites.findOne({
    where: {
      RegisteredUserId: userId,
      ArticleId: articleId
    }
  });
}

async function toggleFavorite(userId, articleId) {
  if (await findFavorite(userId, articleId)) {
    removeFavorite(userId, articleId);
    return false;
  } else {
    createFavorite(userId, articleId);
    return true;
  }
}

async function getUserFavorites(userId) {
  return models.UserArticleFavorites.findAll({
    where: {
      RegisteredUserId: userId
    }
  });
}

// async function getUserHistory() {
//    models.RegisteredUsers.findAll().then(users => {
//       console.log('All users:', JSON.stringify(users.favorites, null, 4));
//    });
// }

async function getUserHistory(userId) {
  return models.UserArticleHistory.findAll({
    where: {
      RegisteredUserId: userId
    }
  });
}

async function updateAvatar(id, file) {
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

module.exports = _client => {
  models = Models(_client);
  client = _client;

  return {
    getAll,
    getOne,
    getOneByEmail,
    createUser,
    deleteUser,
    updateUser,
    authenticate,
    createHistory,
    createFavorite,
    findFavorite,
    toggleFavorite,
    getUserFavorites,
    getUserHistory,
    getUser,
    updateAvatar
  };
};
