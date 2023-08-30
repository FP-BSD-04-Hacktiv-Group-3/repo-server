const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const User = require("../models/users");
const Profile = require("../models/profiles");
const bcrypt = require("bcryptjs");
const { encrypt, comparePassword } = require("../helpers/encrypt");
const { generateToken } = require("../helpers/jwt");

module.exports = {
  findAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.status(200).json({ message: `Find All Users`, users });
    } catch (error) {
      next(error);
    }
  },
  findOneUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      if (!user) {
        throw { name: "invalidAccount" };
      }
      res.status(200).json({ message: `Find One User with id ${id}`, user });
    } catch (error) {
      next(error);
    }
  },
  fetchUserDetail: async (req, res, next) => {
    try {
      const { UserId } = req.params;
      const user = await User.findOne(UserId);
      if (!user) {
        console.log("user1");
        throw { name: "invalidAccount" };
      }

      const profile = await Profile.findOneByUserId(UserId);
      if (!profile) {
        console.log("profile1");
        throw { name: "invalidAccount" };
      }

      user.Profile = profile;
      res
        .status(200)
        .json({ message: `Find One User with id ${UserId}`, user });
    } catch (error) {
      next(error);
    }
  },
  findOneUserByUserId: async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      console.log(userId);
      const user = await User.findOne(id);
      if (!user) {
        throw { name: "invalidAccount" };
      }
      res.status(200).json({ message: `Find One User with id ${id}`, user });
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const newUser = await User.insertOne({
        email,
        password: encrypt(password),
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(newUser, "<< ini new user");
      const newProfile = await Profile.insertOne({
        username: "",
        address: "",
        phoneNumber: "",
        userId: newUser._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ user: newUser, profile: newProfile });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.deleteOne(id);
      if (!user) throw { name: "Error not found" };

      res.status(200).json({ message: `User with id ${id} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
  editUser: async (req, res, next) => {
    try {
      let { username, email, address, phoneNumber, password } = req.body;
      console.log(req.body, 3213);

      console.log(password, "<req");
      const { id } = req.params;

      console.log(password, "1");
      password = encrypt(password);
      console.log(password, "2");

      const updateUser = await User.updateOne(id, {
        email: email,
        password: password,
        updateAt: new Date(),
      });

      console.log(updateUser);

      const updateProfile = await Profile.updateOne(id, {
        username: username,
        address: address,
        phoneNumber: phoneNumber,
        updatedAt: new Date(),
      });

      // console.log(updateUser, 90);

      res.status(201).json({ user: updateUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOneByEmail(email);

      if (!user) {
        throw { name: "invalidAccount" };
      }

      const isValid = comparePassword(password, user.password);
      if (!isValid) {
        console.log("123");
        throw { name: "invalidAccount" };
      } else {
        console.log("321");
        const token = generateToken({
          _id: user._id,
          email: user.email,
          role: user.role,
        });

        res.status(200).json({
          id: user._id,
          access_token: token,
          email: user.email,
          username: user.username,
          role: user.role,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
