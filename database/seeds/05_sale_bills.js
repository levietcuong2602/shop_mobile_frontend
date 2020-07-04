const { getUTCDate } = require('../utils');
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('sale_bills').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('sale_bills').insert([
          {
            id: 1,
            customer_id: 2,
            shiper: 3,
            delivery_date: getUTCDate('15/12/2018'),
            book_date: getUTCDate('10/12/2018'),
            ship_fee: 50000,
            status_order: 2,
            destination_address: 'Tien Yen, Hoai Duc, Ha Noi',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
          {
            id: 2,
            customer_id: 2,
            shiper: 3,
            book_date: getUTCDate('10/12/2018'),
            ship_fee: 50000,
            status_order: 1,
            destination_address: 'Tien Yen, Hoai Duc, Ha Noi',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
        ]);
      })
    });
  });
};