"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  Todo.init(
    {
      userID: DataTypes.UUID,
      content: DataTypes.STRING,
      status: DataTypes.ENUM(["INPROGRESS", "COMPLETED"]),
      category: DataTypes.ENUM(["WORK", "PERSONAL"]),
      deletedAt: DataTypes.DATE,
      priority: DataTypes.ENUM(["LOW", "MEDIUM", "HIGH", "URGENT"]),
      dueDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Todo",
      timestamps: true,
      paranoid: true,
    }
  );
  Todo.beforeCreate(todo => {
    todo.id = uuid();
    todo.createdAt = new Date();
  });
  return Todo;
};


