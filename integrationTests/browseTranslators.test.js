const Translator = require("../models/Translator");
const User = require("../models/User");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = require("../app");

let server;

beforeEach(async () => {
  const dbName = "mongodb://localhost/test";
  await mongoose.connect(dbName);
  await mongoose.connection.dropDatabase();
  server = app({ dbName, port: 3000 });
});

afterEach(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("/filter -> Browsing translators", () => {
  it("all translators should appear in /filter", async () => {
    // GIVEN
    //there is one translator
    await User.create({
      email: "test@volunteer.com",
      password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
      username: "testvolunteer",
      role: "Translator",
      name: "raimo"
    });

    const user = await User.findOne({ email: "test@volunteer.com" });

    await Translator.create({
      user: user.id,
      telephone: "1234-5678",
      role: "Volunteer",
      profileImageUrl:
        "https://res.cloudinary.com/adiya/image/upload/v1536241105/d95jjmjespsbldmtahgh.png",
      location: "Berlin",
      languages: [
        { language: "Oromo", level: "B2" },
        { language: "Maninka", level: "B1" }
      ],
      rating: 4,
      availability: "Mondays from 14.00",
      background: "Doctor, Father of 2 daughters",
      preferedSetting: "No preferences"
    });

    // WHEN
    //we go to /filter
    const response = await fetch("http://localhost:3000/filter/");
    const body = await response.text();

    // THEN
    //we should see one translator
    expect(body).toContain("raimo");
  });
});
