const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");

class User {
  static userCollection() {
    return getDB().collection("users");
  }
  static async findAll() {
    const users = await this.userCollection().find().toArray();

    return users;
  }
  static async findOne(id) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(id),
    });

    return user;
  }
  static async findOneByEmail(email) {
    const datas = await this.findAll();
    const user = await this.userCollection().findOne({
      email,
    });

    return user;
  }
  static async insertOne(payload) {
    const user = await this.userCollection().insertOne(payload);

    const newUser = await this.userCollection().findOne({
      _id: new ObjectId(user.insertedId),
    });
    return newUser;
  }
  static async deleteOne(id) {
    const user = await this.userCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return user;
  }
  static async updateOne(id, payload) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(id),
    });

    const result = await this.userCollection().updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: payload,
      }
    );

    return result;
  }
}

module.exports = User;
