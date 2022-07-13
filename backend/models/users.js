const db = require("../configs/db");
const sequelize = require("sequelize");

const Users = db.define("Todos", {
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  email: sequelize.STRING,
  username: sequelize.STRING,
  password: sequelize.STRING,
  avatar: sequelize.STRING,
  timestamps: true, // auto add createdAt and updatedAt
});

Users.associate = function (models) {
  Users.hasMany(models.Todos, { foreignKey: "id" });
};

module.exports = Users;
