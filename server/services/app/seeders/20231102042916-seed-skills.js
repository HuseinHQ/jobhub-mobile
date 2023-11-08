"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/skill.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Skills", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skills", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
