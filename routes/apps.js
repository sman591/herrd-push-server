var express = require('express');
var router = express.Router();
var App = require('./../models/app');

router.get('/', function(req, res, next) {
  App.fetchAll().then(function(apps) {
    res.render('apps/index', { apps: apps });
  });
});

router.post('/', function (req, res, next) {
  new App({
    name: req.body.name,
    api_key: req.body.api_key
  }).save()
    .then(function (app) {
      res.redirect('/apps/' + app.get('id'))
    }).catch(function (error) {
      res.send('An error occured');
    });
});

router.get('/new', function(req, res, next) {
  res.render('apps/new');
});

router.get('/:id', function(req, res, next) {
  App.where('id', req.params.id).fetch().then(function(app) {
    res.render('apps/show', { app: app });
  });
});

router.get('/:id/destroy', function(req, res, next) {
  App.where('id', req.params.id).destroy()
    .then(function (app) {
      res.redirect('/apps/')
    }).catch(function (error) {
      res.send('An error occured');
    });
});

module.exports = router;
