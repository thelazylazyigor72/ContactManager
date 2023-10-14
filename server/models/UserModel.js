// to work with mongodb
const mongoose = require("mongoose");
// part of auth process, crypto library
const bcrypt = require("bcryptjs");

// since mongoose allow to create schemas, here im definin schema for users
// i wanted simple approach on this one, so user will be defined only by login&password pair
// code below is based on docs, just define fields and make them required
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// hashing password for security reasons
// pre - is all about middlewaring in mongoose
// when we save user data in db, this function called and it hashes user password and then insert user data into specific collection
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
