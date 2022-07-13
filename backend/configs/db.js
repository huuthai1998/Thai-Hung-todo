const sequelize = require("sequelize");

const db = new sequelize({
  database: "todoapp",
  username: "admin",
  password: "123456",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

db.authenticate()
  .then(() => console.log("Connect database successfully"))
  .catch((err) => console.log(err));

module.exports = db;
