const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["WO", "Translator"]
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
