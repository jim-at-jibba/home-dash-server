// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "home",
      user: "postgres",
      password: "caughtwithyourpantsdown",
      host: "localhost",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      database: "home",
      user: "postgres",
      password: "caughtwithyourpantsdown",
      host: "192.168.68.106",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      database: "home_test",
      user: "postgres",
      password: "caughtwithyourpantsdown",
      host: "192.168.68.106",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
}
