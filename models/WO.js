const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./User");
// const Location = require("./Location");

const woSchema = Schema({
  loginData: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  //   location: {
  //     locationId: { type: Schema.Types.ObjectId, ref: "Location" }
  //   },
  profileImageUrl: {
    type: String
  }
  //   idNumber: { type: String, required: true, unique: true }
});

// woSchema.statics.getAllWithLocation = function getAllWithLocation() {
//   return WO.find({}).populate("locationId");
// };

const WO = mongoose.model("WO", woSchema);
module.exports = WO;
