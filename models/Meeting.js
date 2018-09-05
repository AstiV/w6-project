const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const meetingSchema = Schema({
  title: String,
  woStatus: {
    type: String,
    enum: ["waiting", "confirmed", "cancelled"],
    default: "waiting"
  },
  translatorStatus: {
    type: String,
    enum: ["waiting", "confirmed", "cancelled"],
    default: "waiting"
  },
  wo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  translator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  participants: String,
  caseInfo: String,
  status: {
    type: String,
    enum: ["waiting", "confirmed", "cancelled"],
    default: "waiting"
  },
  address: String,
  date: String,
  time: String
});

meetingSchema.plugin(autopopulate);

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
