const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
require("dotenv").config();
const saltRounds = 5;
const userRouter = express.Router();

userRouter.post("/signup", async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body, password: hashed });
    await newUser.save();
    res.send({ message: "User successfully registered." });
  } catch (error) {
    res.status(500);
    res.send({ message: "Some Error Occured", error: error.message });
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    if (result) {
      const match = await bcrypt.compare(password, result.password);
      if (match) {
        const token = jwt.sign({ id: result._id }, process.env.KEY);
        res.send({ message: "User successfully logged in.", token });
      }
    }
    res.status(401);
    res.send({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500);
    res.send({ message: "Some Error Occured", error: error.message });
  }
});

module.exports = userRouter;
