const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = sequelize => {
   const db = {};
   fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
      .forEach(file => {
         const model = sequelize.import(path.join(__dirname, file));
         db[model.name] = model;
      });

   Object.keys(db).forEach(modelName => {
      if ('associate' in db[modelName]) {
         db[modelName].associate(db);
      }
   });

   // Sync before relationships are added
   sequelize.sync();

   // Add relationships
   sequelize.model('UserArticleHistory').belongsTo(sequelize.model('RegisteredUsers'));
   sequelize.model('UserArticleHistory').belongsTo(sequelize.model('Articles'));
   sequelize.model('Articles').hasMany(sequelize.model('UserArticleFavorites'));
   sequelize.model('Articles').hasMany(sequelize.model('UserArticleHistory'));
   sequelize.model('RegisteredUsers').hasMany(sequelize.model('UserArticleFavorites'));
   sequelize.model('RegisteredUsers').hasMany(sequelize.model('UserArticleHistory'));
   sequelize.model('UserArticleFavorites').belongsTo(sequelize.model('RegisteredUsers'));
   sequelize.model('UserArticleFavorites').belongsTo(sequelize.model('Articles'));

   db.sequelize = sequelize;
   db.Sequelize = Sequelize;

   return db;
};