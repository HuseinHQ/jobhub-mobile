const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis("redis://default:Sirua4yS6GzFm2VIsx08fMCxak4LtmfA@redis-16177.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:16177");

const job_url = "http://localhost:4002/jobs/";
const user_url = "http://localhost:4001/users/";

class JobController {
  static async getAllJobs(req, res, next) {
    try {
      const jobCache = await redis.get("jobs");
      if (jobCache) {
        const jobs = JSON.parse(jobCache);
        res.status(200).json(jobs);
      } else {
        const { data } = await axios({
          url: job_url,
        });

        const jobToCache = JSON.stringify(data);
        redis.set("jobs", jobToCache);

        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getJobById(req, res, next) {
    try {
      const { id } = req.params;
      const { data: job } = await axios({
        url: job_url + id,
      });

      const { data: user } = await axios({
        url: user_url + job.authorId,
      });

      job.User = user;

      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  }

  static async createJob(req, res, next) {
    try {
      const { data } = await axios({
        method: "post",
        url: job_url,
        data: req.body,
      });

      await redis.del("jobs");
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateJob(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        method: "put",
        url: job_url + id,
        data: req.body,
      });

      await redis.del("jobs");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        method: "delete",
        url: job_url + id,
      });

      await redis.del("jobs");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JobController;
