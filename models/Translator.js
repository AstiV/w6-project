const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const translatorSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
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
  rating: { type: String, default: "0" },
  availability: String,
  price: { type: String, default: "0" },
  background: String, //relevant job experience for example
  //   meeting: [
  //     {
  //       meeting: { type: Schema.Types.ObjectId, ref: "Meeting" },
  //       status: { type: String, enum: ["confirmed", "waiting", "cancelled"] }
  //     }
  //   ],
  preferedSetting: String //for example doesn't want to work with people who went through specific experiences
});

translatorSchema.plugin(autopopulate);

const Translator = mongoose.model("Translator", translatorSchema);
module.exports = Translator;
