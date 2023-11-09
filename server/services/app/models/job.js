"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.Company, { foreignKey: "companyId" });
      Job.hasMany(models.Skill, { foreignKey: "jobId" });
      Job.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required!" },
          notEmpty: { msg: "Title is required!" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required!" },
          notEmpty: { msg: "Description is required!" },
        },
      },
      companyId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Job type is required!" },
          notEmpty: { msg: "Job type is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
