
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('product_attributes').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
          return knex('product_attributes').insert([
            {
              id: 1, 
              product_type_id: 1,
              category_attribute_id: 1,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 2, 
              product_type_id: 1,
              category_attribute_id: 3,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 3, 
              product_type_id: 1,
              category_attribute_id: 4,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 4, 
              product_type_id: 1,
              category_attribute_id: 5,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 5, 
              product_type_id: 1,
              category_attribute_id: 6,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 6, 
              product_type_id: 1,
              category_attribute_id: 7,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 7, 
              product_type_id: 1,
              category_attribute_id: 8,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 8, 
              product_type_id: 2,
              category_attribute_id: 1,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 9, 
              product_type_id: 2,
              category_attribute_id: 3,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 10, 
              product_type_id: 2,
              category_attribute_id: 4,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 11, 
              product_type_id: 1,
              category_attribute_id: 5,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
            {
              id: 12, 
              product_type_id: 1,
              category_attribute_id: 6,
              created_at: knex.fn.now(),
              updated_at: knex.fn.now()
            },
          ]);
        })
    });
  });
};
