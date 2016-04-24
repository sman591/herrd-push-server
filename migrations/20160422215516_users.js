
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.unique('username');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
