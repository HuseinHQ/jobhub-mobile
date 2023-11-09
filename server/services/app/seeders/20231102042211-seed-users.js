"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      return el;
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
