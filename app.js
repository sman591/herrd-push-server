var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var User = require('./models/user');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({ secret: process.env.COOKIE_SECRET }));
app.use(flash());

// passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.where('username', username).fetch()
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (error) {
        return done(error);
      });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      User.where('username', username).fetch()
        .then(function(user) {
          if (user) {
            return done(null, false, req.flash('error', 'That username is already taken.'));
          } else {
            new User({
              username: username,
              password: new User().generateHash(password)
            }).save()
              .then(function (user) {
                return done(null, user);
              }).catch(function (error) {
                return done(error);
              });
          }
        })
        .catch(function(error) {
          return done(error);
        });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.get("id"));
});

passport.deserializeUser(function(id, done) {
  User.where('id', id).fetch()
    .then(function(user) {
      return done(null, user);
    })
    .catch(function (error) {
      return done(error);
    });
});

app.use(passport.initialize());
app.use(passport.session());

// make current user available everywhere
app.use(function(req, res, next) {
  res.locals.current_user = req.user;
  next();
});

// bower dependencies
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// routes
var routes = require('./routes/index');
var auth = require('./routes/auth');
var apps = require('./routes/apps');
var api = require('./routes/api');

app.use('/', routes);
app.use('/auth', auth);
app.use('/apps', apps);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
