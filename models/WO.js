const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const woSchema = Schema({
  loginData: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  location: String,
  profileImageUrl: {
    type: String
  },
  idNumber: { type: String, unique: true }
});

const WO = mongoose.model("WO", woSchema);
module.exports = WO;
