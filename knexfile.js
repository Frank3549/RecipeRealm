/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

// Adapted from NextJS knex example
const dev = process.env.NODE_ENV !== "production";
const { DATABASE_URL } = loadEnvConfig("./", dev).combinedEnv;

const defaultSettings = {
  migrations: {
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
};

module.exports = {
  test: {
    ...defaultSettings,
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    seeds: {
      directory: "./knex/seeds/test",
    },
  },

  //   test: {
  //     ...defaultSettings,
  //     client: "pg",
  //     connection: async () => {
  //       // Only import testcontainers when running in a test environment
  //       const { PostgreSqlContainer } = await import(
  //         "@testcontainers/postgresql"
  //       );

  //       // Create a new container for each connection, i.e., for each test file
  //       // being run in parallel. These containers are automatically cleaned up
  //       // by test containers via its ryuk resource reaper.
  //       const container = await new PostgreSqlContainer("postgres:15").start();
  //       return {
  //         host: container.getHost(),
  //         port: container.getPort(),
  //         database: container.getDatabase(),
  //         user: container.getUsername(),
  //         password: container.getPassword(),
  //       };
  //     },
  //     seeds: {
  //       directory: "./knex/seeds/test",
  //     },
  //   },

  development: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
    },
  },

  production: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
  },
};
