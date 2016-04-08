
exports.up = function(knex, Promise) {
  return knex.schema.table('apps', function (table) {
    table.unique('name');
    table.unique('api_key');
  })
};

exports.down = function(knex, Promise) {

};
