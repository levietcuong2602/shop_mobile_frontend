
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('sale_details').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sale_details').insert([
        {
          id: 1,
          product_id: 1,
          unit_price: 7990000,
          amount: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          id: 1,
          product_id: 2,
          unit_price: 30890000,
          amount: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          id: 2,
          product_id: 1,
          unit_price: 7990000,
          amount: 2,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          id: 2,
          product_id: 2,
          unit_price: 30890000,
          amount: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        }
      ]);
    });
};
