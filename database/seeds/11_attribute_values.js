
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('attribute_values').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('attribute_values').insert([
          {
            product_id: 1,
            product_attribute_id: 1,
            value: '32G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 3,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 4,
            product_attribute_id: 1,
            value: '1G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 5,
            product_attribute_id: 1,
            value: '128G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 6,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 7,
            product_attribute_id: 1,
            value: '256G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 8,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 9,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 10,
            product_attribute_id: 1,
            value: '32G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 11,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 12,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 13,
            product_attribute_id: 1,
            value: '32G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 14,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 15,
            product_attribute_id: 1,
            value: '256G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 17,
            product_attribute_id: 1,
            value: '128G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 18,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 19,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 20,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 21,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 21,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 22,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 23,
            product_attribute_id: 1,
            value: '32G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 24,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 25,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 26,
            product_attribute_id: 1,
            value: '8G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 27,
            product_attribute_id: 1,
            value: '8G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 28,
            product_attribute_id: 1,
            value: '16G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 29,
            product_attribute_id: 1,
            value: '32G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
          {
            product_id: 30,
            product_attribute_id: 1,
            value: '64G',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          },
        ]);
      });
    })
  });
};
