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
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  findOneUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);

      res.status(200).json({ message: `Find One User with id ${id}`, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  createUser: async (req, res, next) => {
    console.log("hi");
    console.log(req.body, "<<< 33");
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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.deleteOne(id);
      console.log(user, "<<<<<< iNI USER");
      if (!user) throw { name: "Error not found" };

      res.status(200).json({ message: `User with id ${id} has been deleted` });
    } catch (err) {
      console.log(err);
      if (err.name === "Error not found") {
        res.status(404).json({ message: "Error not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
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

      console.log(updateUser, 90);

      res.status(201).json({ user: updateUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
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
        throw { name: "invalidAccount" };
      } else {
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
    } catch (err) {
      console.log(err);
    }
  },
};
