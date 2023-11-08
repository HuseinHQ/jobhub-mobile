const { getDb } = require("../config/mongo");
const { hashPassword } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

class User {
  static async collection() {
    return await getDb().collection("users");
  }

  static async findAll() {
    try {
      const collection = await this.collection();

      const users = await collection.find().toArray();

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findByPk(id) {
    try {
      const collection = await this.collection();

      const findUser = await collection.findOne({ _id: new ObjectId(id) });
      if (!findUser) {
        throw { name: "user_not_found" };
      }

      return findUser;
    } catch (err) {
      throw err;
    }
  }

  static async create({ username, email, password, role, phoneNumber, address }) {
    try {
      const collection = await this.collection();

      const hashedPassword = hashPassword(password);

      const res = await collection.insertOne({ username, email, password: hashedPassword, role, phoneNumber, address });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const collection = await this.collection();

      const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(id) });
      if (!deletedCount) {
        throw { name: "user_not_found" };
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
