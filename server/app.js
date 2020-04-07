const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routeHandler = require('./routes');
const cors = require('cors');
var session = require('express-session');

module.exports = config => {
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));

  app.use(cors());

  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', routeHandler(config));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error(`Not Found (${req.url})`);
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};
