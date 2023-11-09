"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/company.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Companies", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Companies", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
