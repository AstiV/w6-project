const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translatorSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  profileImageUrl: {
    type: String
  },
  role: {
    type: String,
    enum: ["Volunteer", "Professional"]
  },
  location: String,
  telephone: String,
  languages: [
    {
      language: String,
      level: { type: String, enum: ["A1", "A2", "B1", "B2", "C1", "C2"] }
    }
  ],
  rating: Number,
  availability: String,
  price: Number,
  background: Array, //relevant job experience for example
  //   meeting: [
  //     {
  //       meeting: { type: Schema.Types.ObjectId, ref: "Meeting" },
  //       status: { type: String, enum: ["confirmed", "waiting", "cancelled"] }
  //     }
  //   ],
  preferedSetting: Array //for example doesn't want to work with people who went through specific experiences
});

const Translator = mongoose.model("Translator", translatorSchema);
module.exports = Translator;
