"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/job.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Jobs", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Jobs", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
