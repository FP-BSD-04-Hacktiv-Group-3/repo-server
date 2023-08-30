const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const User = require("../models/users");
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
      const { email, password, role = "user" } = req.body;
      console.log(req.body);
      const newUser = await User.insertOne({
        email,
        password: encrypt(password),
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ user: newUser });
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
      let { email, password, role } = req.body;

      const { id } = req.params;

      password = encrypt(password);

      const updateUser = await User.updateOne(id, {
        email,
        password,
        role,
        updateAt: new Date(),
      });

      // console.log(updateUser, 90);

      res.status(201).json({ user: updateUser });
    } catch (error) {
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
