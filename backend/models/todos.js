const db = require("../configs/db");
const sequelize = require("sequelize");

const Todos = db.define("Todos", {
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  userID: sequelize.UUID,
  content: sequelize.STRING,
  status: sequelize.ENUM(["PENDING", "COMPLETED"]),
  category: sequelize.ENUM(["URGENT", "MEDIUM", "HIGH", "LOW"]),
  deletedAt: sequelize.TIME,
  timestamps: true, // auto add createdAt and updatedAt
});

Todos.associate = function (models) {
  Todos.belongsTo(models.Users, { foreignKey: "userID" });
};

module.exports = Todos;