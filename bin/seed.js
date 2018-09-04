const mongoose = require("mongoose");
const User = require("../models/User");
const Translator = require("../models/Translator");
const WO = require("../models/WO");
const bcrypt = require("bcrypt");

const dbName = "translations";
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
  {
    email: "test@wo.com",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
    username: "testwo",
    role: "WO"
  },
  {
    email: "test@volunteer.com",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
    username: "testvolunteer",
    role: "Translator"
  },
  {
    email: "test@professional.com",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
    username: "testprofessional",
    role: "Translator"
  }
];

User.create(users, err => {
  if (err) throw err;
  console.log(`Created ${users.length} users`);

  User.findOne({ email: "test@volunteer.com" }).then(translator => {
    const newTranslator = {
      user: translator.id,
      telephone: "1234-5678",
      role: "Volunteer",
      profileImageUrl: "https://tinyurl.com/y74ljegq",
      location: "Berlin",
      languages: [
        { language: "Oromo", level: "B2" },
        { language: "Maninka", level: "B1" }
      ],
      rating: 4,
      availability: "Mondays from 14.00",
      background: ["Doctor", "Father of 2 daughters"],
      preferedSetting: "No preferences"
    };

    Translator.create(newTranslator, err => {
      if (err) throw err;
      console.log(`Created one translator`);
    });
  });

  User.findOne({ email: "test@professional.com" }).then(translator => {
    const newTranslator = {
      user: translator.id,
      telephone: "23-890",
      role: "Professional",
      profileImageUrl: "https://tinyurl.com/ydghhnky",
      location: "Leipzig",
      languages: [
        { language: "Tigrinya", level: "C1" },
        { language: "Wolof", level: "C1" }
      ],
      price: 100,
      rating: 5,
      availability: "Call to make an appointment",
      background: ["Professional translator", "Expertise in art"],
      preferedSetting: "No preferences"
    };

    Translator.create(newTranslator, err => {
      if (err) throw err;
      console.log(`Created one translator`);
      User.findOne({ email: "test@wo.com" }).then(wo => {
        const newWo = {
          user: wo.id,
          location: "Berlin",
          profileImageUrl: "https://tinyurl.com/ydzaghlc",
          idNumber: "A15 697 I7"
        };

        WO.create(newWo, err => {
          if (err) throw err;
          console.log(`Created one WO`);

          mongoose.connection.close();
        });
      });
    });
  });
});
