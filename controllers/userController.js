const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User data feteched successfully.",
      user,
    });
  } catch (error) {}
};

// update user

const updateUserController = async (req, res) => {
  try {
    // get user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // update user
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

// update password
const updatePasswordController = async (req, res) => {
  try {
    // get user
    const user = await userModel
      .findById({ _id: req.body.id })
      .select("+password");
    // validation
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    // get user data
    const { oldPassword, newPassword } = req.body;

    // check if old password is valid
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // if password is valid then hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    // update password
    user.password = newPassword;
    user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      error,
    });
  }
};

// reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Either email or answer is wrong",
      });
    }

    // if user and answer is okay then hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = newPassword;
    user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
};
