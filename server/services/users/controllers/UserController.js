const User = require("../models/User");

class UserController {
  static async getAllUser(req, res, next) {
    try {
      const user = await User.findAll();

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const findUser = await User.findByPk(id);

      res.status(200).json(findUser);
    } catch (err) {
      next(err);
    }
  }

  static async postUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;

      await User.create({ username, email, password, role, phoneNumber, address });

      res.status(201).json({ message: "New user successfully created!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await User.delete(id);

      res.status(200).json({ message: `User with id ${id} deleted successfully!` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
