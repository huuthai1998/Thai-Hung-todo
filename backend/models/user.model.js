"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: "id" });
    }
  }
  User.init(
    {
      id: DataTypes.UUID,
      username: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.id = uuid();
    user.createdAt = new Date();
  });
  return User;
};
