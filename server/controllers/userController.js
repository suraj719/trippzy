import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const UserExists = await User.findOne({
      email: req.body.email,
    });
    if (UserExists) {
      return res.status(200).send({
        message: "already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({
      message: "Registration successful",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      succes: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign({ userID: user._id }, process.env.jwt_secret, {
      expiresIn: "12h",
    });
    res.status(200).send({
      message: "Login successful",
      success: true,
      data: token,
      userID: user._id,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userID,
    });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
    user.password = undefined;
    res.status(200).send({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
