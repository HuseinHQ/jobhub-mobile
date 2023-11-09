const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis("redis://default:Sirua4yS6GzFm2VIsx08fMCxak4LtmfA@redis-16177.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:16177");
const user_url = "http://localhost:4001/users";

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const userCache = await redis.get("users");
      if (userCache) {
        const users = JSON.parse(userCache);
        res.status(200).json(users);
      } else {
        const { data } = await axios({
          url: user_url,
        });

        const usersToCache = JSON.stringify(data);
        await redis.set("users", usersToCache);

        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: user_url + `/${id}`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { data } = await axios({
        method: "post",
        url: user_url,
        data: req.body,
      });

      await redis.del("users");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "delete",
        url: user_url + `/${id}`,
      });

      await redis.del("users");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
