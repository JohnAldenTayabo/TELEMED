const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    // Attempt connection using MONGO_URL from .env
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
