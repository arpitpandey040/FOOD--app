const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // hide password in response
    },
    phone: {
      type: String,
      required: [true, "Phone No is required."],
      unique: true,
    },
    address: {
      type: Array,
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["admin", "client", "manager", "driver", "vendor"],
      default: "client",
    },
    profile: {
      type: String,
      default: "https://iconduck.com/icons/112808/user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
