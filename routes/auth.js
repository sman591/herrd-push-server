var express = require('express');
var router = express.Router();
var services = require('../services');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

router.get('/login', function(req, res, next) {
  res.render('auth/login', { flash: req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/apps',
                                   failureRedirect: '/auth/login',
                                   failureFlash: true }));

router.get('/signup', isFirstUser, function(req, res, next) {
  res.render('auth/signup', { flash: req.flash('error') });
});

router.post('/signup', isFirstUser,
  passport.authenticate('local-signup', { successRedirect: '/apps',
                                          failureRedirect: '/auth/signup',
                                          failureFlash: true }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isFirstUser(req, res, next) {
  if (req.isAuthenticated())
    return next();

  User.count()
    .then(function(count) {
      if (count < 1)
        return next();
      req.flash('error', 'Only logged-in users may create accounts.');
      res.redirect('/auth/login');
    })
}

module.exports = router;
