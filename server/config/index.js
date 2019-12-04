const bunyan = require('bunyan');

const appname = 'Group_07';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  mysql: {
    options: {
      host: '172.17.0.1',
      port: 3306,
      database: 'Group07',
      dialect: 'mysql',
      username: 'root',
      password: 'mypassword',
      operatorsAliases: false
    }
  }
};
