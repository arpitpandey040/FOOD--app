const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const colors = require("colors");
const JWT = require("jsonwebtoken");

// Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already exists, Please login ",
      });
    }

    // hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //  create new user
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    // check if user exist

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    console.log(`user is ${user}`.bgGreen);
    // check password || compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};
module.exports = { registerController, loginController };
