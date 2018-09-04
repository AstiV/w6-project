const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const Language = require("../models/Language");

router.get("/show", (req, res) => {
  //   console.log(req.user);
  const { id } = req.user;

  Translator.findOne({ loginData: id })
    .populate("loginData")
    .exec(function(err, translator) {
      if (err) return handleError(err);
      console.log("The Translator data is %s", translator);
    });

  //result is:
  // The Translator data is { background: [],
  //     prefferedSetting: [],
  //     _id: 5b8e3683de92777b99f8f402,
  //     loginData:
  //      { _id: 5b8e3683de92777b99f8f401,
  //        username: 'tr',
  //        email: 'tr',
  //        password: '$2a$08$H83itYXetqFEpzmju7pk.u7edkfkfZkoDzJUW7b8BTsoHa9J59G7u',
  //        role: 'Translator',
  //        __v: 0 },
  //     languages: [],
  //     __v: 0 }
});

module.exports = router;
