var express = require('express');
var router = express.Router();
var App = require('./../models/app');
var uuid = require('node-uuid');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.get('/', requireAuth, function(req, res, next) {
  App.fetchAll().then(function(apps) {
    res.render('apps/index', { apps: apps });
  });
});

router.post('/', requireAuth, function (req, res, next) {
  new App({
    name: req.body.name,
    api_key: uuid.v4()
  }).save()
    .then(function (app) {
      res.redirect('/apps/' + app.get('id'))
    }).catch(function (error) {
      res.send('An error occured');
    });
});

router.get('/new', requireAuth, function(req, res, next) {
  res.render('apps/new');
});

router.get('/:id', requireAuth, function(req, res, next) {
  App.where('id', req.params.id).fetch().then(function(app) {
    res.render('apps/show', { app: app });
  });
});

router.get('/:id/regenerate', requireAuth, function(req, res, next) {
  App.where('id', req.params.id).fetch().then(function(app) {
    app.set({
      api_key: uuid.v4()
    }).save()
    .then(function (app) {
      res.redirect('/apps/' + app.get('id'))
    }).catch(function (error) {
      res.send('An error occured');
    })
  });
});

router.get('/:id/destroy', requireAuth, function(req, res, next) {
  App.where('id', req.params.id).destroy()
    .then(function (app) {
      res.redirect('/apps/')
    }).catch(function (error) {
      res.send('An error occured');
    });
});

function requireAuth(req, res, next) {
  if (req.isAuthenticated())
    return next();
  req.flash('error', 'You must be logged in to view that page.');
  res.redirect('/auth/login');
}

module.exports = router;
