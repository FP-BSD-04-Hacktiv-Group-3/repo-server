const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const Profile = require("../models/profiles");

module.exports = {
  findAllProfiles: async (req, res, next) => {
    try {
      const profiles = await Profile.findAll();

      res.status(200).json({ message: `Find All Profiles`, profiles });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  findOneProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne(id);

      res
        .status(200)
        .json({ message: `Find One Profile with id ${id}`, profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  createProfile: async (req, res, next) => {
    console.log("hi");
    console.log(req.body, "<<< 33");
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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
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
    } catch (err) {
      console.log(err);
      if (err.name === "Error not found") {
        res.status(404).json({ message: "Error not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
