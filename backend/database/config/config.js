require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      encrypt: true,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "dev_db",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      encrypt: true,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
