"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Job, { foreignKey: "companyId" });
    }
  }
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required!" },
          notEmpty: { msg: "Name is required!" },
        },
      },
      companyLogo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Company logo url is required!" },
          notEmpty: { msg: "Company logo url is required!" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Location is required!" },
          notEmpty: { msg: "Location is required!" },
        },
      },
      email: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required!" },
          notEmpty: { msg: "Description is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
