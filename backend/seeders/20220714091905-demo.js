"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "041903cb-098f-4909-92a5-7143a8286e08",
          username: "demo",
          email: "demo@gmail.com",
          password: "demo",
          createdAt: new Date()
        },
        {
          id: "759e3be7-f985-4d4f-a132-3c47b5f20602",
          username: "demo1",
          email: "demo1@gmail.com",
          password: "demo1",
          createdAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
