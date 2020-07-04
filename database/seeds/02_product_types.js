
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('product_type').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('product_type').insert([
          { id: 1, product_type_name: 'Điện thoại', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 2, product_type_name: 'Máy tính', created_at: knex.fn.now(), updated_at: knex.fn.now() },
        ]);
      })
    });
  });
};
