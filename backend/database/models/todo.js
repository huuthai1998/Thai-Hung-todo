"use strict";
const { Model } = require("sequelize");
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
      deletedAt: DataTypes.TIME,
      priority: DataTypes.ENUMENUM(["LOW", "MEDIUM", "HIGH", "URGENT"]),
      dueDate: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};


