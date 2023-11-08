const { verifyPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "email_required" };
      }

      if (!password) {
        throw { name: "password_required" };
      }

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "login_error" };
      }

      const isPasswordValid = verifyPassword(password, findUser.password);
      if (!isPasswordValid) {
        throw { name: "login_error" };
      }

      const access_token = createToken({ id: findUser.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      await User.create({ username, email, password, role: "admin", phoneNumber, address });

      res.status(201).json({ message: "New admin registered successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
