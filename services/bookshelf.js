var express = require('express');
var app     = express();

var config  = require('../knexfile.js');
var env     = app.get('env');
var knex    = require('knex')(config[env]);

var bookshelf = module.exports = require('bookshelf')(knex);
