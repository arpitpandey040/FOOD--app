const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `database is connected on ${mongoose.connection.host}`.bgYellow
    );
  } catch (error) {
    console.log(`Error in connecting DB`.bgRed);
  }
};

module.exports = connectDB;
