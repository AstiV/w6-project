const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const woSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  location: String,
  profileImageUrl: {
    type: String
  },
  idNumber: { type: String, unique: true }
});

woSchema.plugin(autopopulate);

const WO = mongoose.model("WO", woSchema);
module.exports = WO;
