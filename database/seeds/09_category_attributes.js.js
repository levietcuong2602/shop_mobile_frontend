
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('category_attributes').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('category_attributes').insert([
          {id: 1, category_name: 'storage', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 2, category_name: 'color', created_at: knex.fn.now(),updated_at: knex.fn.now()},      
          {id: 3, category_name: 'screen-size', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 4, category_name: 'network', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 5, category_name: 'hdh', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 6, category_name: 'ram', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 7, category_name: 'sim', created_at: knex.fn.now(),updated_at: knex.fn.now()},
          {id: 8, category_name: 'camera-behind', created_at: knex.fn.now(),updated_at: knex.fn.now()},
        ]);
      })
    });
  });
};