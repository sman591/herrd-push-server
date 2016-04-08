var services  = require('../services');
var checkit   = require('checkit');

var App = module.exports = services.bookshelf.Model.extend({
  tableName: 'apps',
  hasTimestamps: ['created_at', 'updated_at'],

  initialize: function(attrs, opts) {
    this.on('saving', this.validateState);
  },

  validateState: function() {
    return new checkit({
      name: 'required'
    }).run(this.attributes);
  }
});
