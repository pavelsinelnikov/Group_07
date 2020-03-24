const bunyan = require('bunyan');

const appname = 'Group_07';

module.exports = {
   applicationName: appname,
   logger: bunyan.createLogger({ name: appname }),
   mysql: {
      options: {
         host: 'localhost',
         port: 3306,
         database: 'Group07',
         dialect: 'mysql',
         username: 'root',
         password: 'mypassword',
         operatorsAliases: false
      }
   }
};
