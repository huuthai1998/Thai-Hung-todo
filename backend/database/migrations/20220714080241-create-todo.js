"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Todos", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userID: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      content: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(["INPROGRESS", "COMPLETED"]),
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
        type: Sequelize.TIME,
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
