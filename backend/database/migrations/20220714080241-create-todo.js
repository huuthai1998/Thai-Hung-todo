"use strict";

const { uuid } = require("uuidv4");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Todos", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      userID: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(["INPROGRESS", "COMPLETED"]),
        defaultValue: "INPROGRESS"
      },
      category: {
        type: Sequelize.ENUM(["WORK", "PERSONAL"]),
      },
      deletedAt: {
        type: Sequelize.TIME,
      },
      priority: {
        type: Sequelize.ENUM(["LOW", "MEDIUM", "HIGH", "URGENT"]),
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Todos");
  },
};
