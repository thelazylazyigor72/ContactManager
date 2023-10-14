// importing mongoose so i can work w/ mongodb
const mongoose = require("mongoose");
// to use env vars
require("dotenv").config();
const { MONGODB_URL } = process.env;

// here im trying to connect to db, simple trycatch and some simple code from mongoose docs
const connectDB = async () => {
  try {
    // first parser to use new url parser
    // second parameter is about mongodb using new server discovery and monitoring engine
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB ");
  } catch (err) {
    // simply saying error message to console
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
