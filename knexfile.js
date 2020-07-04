// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "bkstore",
      user: "root",
      password: "",
      host: "127.0.0.1",
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "demo",
      user: "devuser",
      password: "password",
      host: "127.0.0.1",
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/seeds",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
