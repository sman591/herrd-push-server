var services = require('../services');
var checkit  = require('checkit');
var bcrypt   = require('bcrypt-nodejs');

var User = module.exports = services.bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  initialize: function(attrs, opts) {
    this.on('saving', this.validateState);
  },

  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  validPassword: function(password) {
    return bcrypt.compareSync(password, this.get("password"));
  },

  validateState: function() {
    return new checkit({
      username: 'required',
      password: 'required'
    }).run(this.attributes);
  }
});
