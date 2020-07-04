
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('SET foreign_key_checks = 0').then(function () {
    return knex('providers').truncate().then(function () {
      return knex.raw('SET foreign_key_checks = 1').then(function () {
        return knex('providers').insert([
          { id: 1, name: 'XIAOMI', logo: '//vn-live-03.slatic.net/original/029ef88856e554009ef014f6109a8c1d.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 2, name: 'SAMSUNG', logo: '//vn-live-01.slatic.net/original/65fa75cabea090540e56620e95f73146.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 3, name: 'NOKIA', logo: '//vn-live-01.slatic.net/original/1b0cbfed5303a6cfdf1533f1dd4add14.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 4, name: 'OPPO', logo: '//vn-live-03.slatic.net/original/e4b0daccf569b22374baa62c1b3abe20.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 5, name: 'APPLE', logo: '//vn-live-03.slatic.net/original/9593a960fd8c7805479ff31fa0fcc137.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 6, name: 'DELL', logo: 'https://salt.tikicdn.com/media/upload/2018/03/08/e6dff77a2b297ab9bef501be3e0ba3c2.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 7, name: 'ASUS', logo: 'https://salt.tikicdn.com/media/upload/2018/03/08/20e77724eec1e14f3a883c57201201af.jpg', created_at: knex.fn.now(), updated_at: knex.fn.now() },
          { id: 8, name: 'HUAWEI', logo: 'https://vn-test-11.slatic.net/shop/4122dfa243483b77c96b00713e4f64c4.png', created_at: knex.fn.now(), updated_at: knex.fn.now() },
        ]);
      })
    });
  });
};
