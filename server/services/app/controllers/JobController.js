const { Job, Skill, sequelize } = require("../models/");

class JobController {
  static async getAllJobs(req, res, next) {
    try {
      const data = await Job.findAll({ order: [["updatedAt", "DESC"]], include: [Skill, "Company", "User"] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getJobById(req, res, next) {
    try {
      const { jobId } = req.params;
      const data = await Job.findByPk(jobId, {
        include: ["Skills", "User", "Company"],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async postJobs(req, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const { title, description, companyId, jobType, Skills } = req.body;
        const authorId = req.user.id;

        const newJob = await Job.create({ title, description, companyId, authorId, jobType }, { transaction: t });

        const mappedSkills = Skills.map((skill) => {
          skill.jobId = newJob.id;
          return skill;
        });

        await Skill.bulkCreate(mappedSkills, { transaction: t });

        res.status(201).json({ message: "New job created successfully!" });
      });
    } catch (error) {
      next(error);
    }
  }

  static async putJobs(req, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const { title, description, companyId, jobType, Skills } = req.body;
        const { jobId } = req.params;

        const findJob = await Job.findByPk(jobId, { transaction: t });
        if (!findJob) {
          throw { name: "job_not_found" };
        }

        await Job.update(
          { title, description, companyId, jobType },
          {
            where: { id: jobId },
            transaction: t,
          }
        );

        const mappedSkills = Skills.map((skill) => {
          skill.jobId = jobId;
          return skill;
        });

        await Skill.bulkCreate(mappedSkills, {
          transaction: t,
          updateOnDuplicate: ["name", "level"],
        });

        res.status(200).json({ message: `Job with id ${jobId} updated successfully!` });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteJobs(req, res, next) {
    try {
      const { jobId } = req.params;

      const findJob = await Job.findByPk(jobId);
      if (!findJob) {
        throw { name: "job_not_found" };
      }

      await Job.destroy({ where: { id: jobId } });

      res.status(200).json({ message: `Job with id ${jobId} deleted successfully!` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JobController;
