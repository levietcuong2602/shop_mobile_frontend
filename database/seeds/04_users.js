const helper = require('../../src/helpers/helper');
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('users').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('users').insert([
          {
            id: 1,
            full_name: 'Nguyen Tai Tieu',
            email: 'tieunt.bk97@gmail.com',
            passwd: helper.hashPassword('12345678'),
            phone_number: '0123456789',
            address: 'Tien Yen, Hoai Duc, Ha Noi',
            level: 2,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
          {
            id: 2,
            full_name: 'Tran Van Trang',
            email: 'trangtv.bk97@gmail.com',
            passwd: helper.hashPassword('12345678'),
            phone_number: '0123456789',
            address: 'Tien Yen, Hoai Duc, Ha Noi',
            level: 1,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
          {
            id: 3,
            full_name: 'Nguyen Van A',
            email: 'nguyenvana@gmail.com',
            passwd: helper.hashPassword('12345678'),
            phone_number: '0123456789',
            address: 'Bac Ninh',
            level: 4,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
        ]);
      })
    });
  });
};
