var express = require('express');
var router = express.Router();
var App = require('./../models/app');
var onesignal = require('node-opensignal-api');
var onesignal_client = onesignal.createClient();

router.get('/', function(req, res, next) {
  res.send('It works!');
});

router.get('/players', function (req, res, next) {
  App.where({ api_key: req.query.api_key }).fetch().then(function(app) {
    if (app == null) {
      res.status(404).send('Not found');
      return;
    }
    var params = {
      app_id: process.env.ONESIGNAL_APP_ID
    };
    onesignal_client.players.viewall(process.env.ONESIGNAL_API_KEY, params, function (err, response) {
      if (err) {
        res.status(400).send('Invalid request')
      } else {
        var players = [];
        response.players.forEach(function(entry) {
          if (entry.tags.app_name == app.get('name')) {
            players.push(entry);
          }
        });
        response.players = players;
        response.total_count = players.length;
        res.send(response);
      }
    });
  });
});


router.post('/send', function (req, res, next) {
  App.where({ api_key: req.body.api_key }).fetch().then(function(app) {
    if (app == null) {
      res.status(404).send('Not found');
      return;
    }
    var params = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: req.body.contents,
      tags: [
        { "key": "app_name", "relation": "=", "value": app.get('name')},
        { "key": "user_id", "relation": "=", "value": req.body.user_id}
      ]
    };
    onesignal_client.notifications.create(process.env.ONESIGNAL_API_KEY, params, function (err, response) {
      if (err) {
        res.status(400).send('Invalid request')
      } else {
        console.log(response);
        res.send('Success');
      }
    });
  });
});

module.exports = router;
