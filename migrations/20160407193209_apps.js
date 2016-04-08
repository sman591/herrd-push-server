
exports.up = function(knex, Promise) {
  return knex.schema.createTable('apps', function (table) {
    table.increments();
    table.string('name');
    table.string('api_key');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
