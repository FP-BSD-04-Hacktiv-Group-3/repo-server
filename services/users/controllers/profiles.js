const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const Profile = require("../models/profiles");

module.exports = {
  findAllProfiles: async (req, res, next) => {
    try {
      const profiles = await Profile.findAll();

      res.status(200).json({ message: `Find All Profiles`, profiles });
    } catch (error) {
      next(error);
    }
  },
  findOneProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne(id);
      if (!profile) {
        throw { name: "invalidAccount" };
      }
      res
        .status(200)
        .json({ message: `Find One Profile with id ${id}`, profile });
    } catch (error) {
      next(error);
    }
  },
  createProfile: async (req, res, next) => {
    try {
      const { username, address, phoneNumber, userId } = req.body;
      console.log(req.body);
      const newProfile = await Profile.insertOne({
        username,
        address,
        phoneNumber,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ profile: newProfile });
    } catch (error) {
      next(error);
    }
  },
  deleteProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await Profile.deleteOne(id);

      if (!profile) throw { name: "Error not found" };

      res
        .status(200)
        .json({ message: `Profile with id ${id} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
  editProfile: async (req, res, next) => {
    try {
      let { username, address, phoneNumber, userId } = req.body;
      const { id } = req.params;

      const updateProfile = await Profile.updateOne(id, {
        username,
        address,
        phoneNumber,
        userId,
        updatedAt: new Date(),
      });

      res.status(201).json({ profile: updateProfile });
    } catch (error) {
      next(error);
    }
  },
};
