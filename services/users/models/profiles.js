const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");

class Profile {
  static profileCollection() {
    return getDB().collection("profiles");
  }
  static async findAll() {
    const profiles = await this.profileCollection().find().toArray();

    return profiles;
  }
  static async findOne(id) {
    const profile = await this.profileCollection().findOne({
      _id: new ObjectId(id),
    });

    return profile;
  }
  static async findOneByUserId(id) {
    const profile = await this.profileCollection().findOne({
      userId: new ObjectId(id),
    });

    return profile;
  }
  static async insertOne(payload) {
    const profile = await this.profileCollection().insertOne(payload);

    const newProfile = await this.profileCollection().findOne({
      _id: new ObjectId(profile.insertedId),
    });
    return newProfile;
  }
  static async deleteOne(id) {
    const profile = await this.profileCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return profile;
  }
  static async updateOne(id, payload) {
    // const profile = await this.profileCollection().findOne({
    //   _id: new ObjectId(id),
    // });

    const result = await this.profileCollection().updateOne(
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

module.exports = Profile;
