const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const WO = require("../models/WO");
const User = require("../models/User");
const formatFields = require("../utils/editFormFormatting");

//use this middleware at every request to check if user is logged in
router.use((req, res, next) => {
  //if there is not a running session with a user
  if (!req.user) {
    res.render("index", {
      message: "You must be logged in to view this page"
    });
  } else {
    next();
  }
});

router.get("/show", (req, res) => {
  const { id } = req.user;
  if (req.user.role === "WO") {
    WO.findOne({ user: id })
      .populate("user")
      .then(wo => {
        res.render("profile/show", { wo });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translatorRaw => {
      let translator = { ...translatorRaw }._doc;
      translator.background = translator.background.split(", ");
      translator.preferedSetting = translator.preferedSetting.split(", ");
      res.render("profile/show", { translator });
    });
  }
});

router.get("/edit", (req, res) => {
  const { id } = req.user;

  if (req.user.role === "WO") {
    WO.findOne({ user: id })
      .populate("user")
      .then(wo => {
        res.render("profile/edit", { wo });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translator => {
      res.render("profile/edit", {
        translator,
        isProfessional: translator.role === "Professional"
      });
    });
  }
});
router.post("/edit", (req, res) => {
  //TODO implement overwriting of db data
  const { id } = req.user;
  const dataFromForm = req.body;
  const formattedFields = formatFields(dataFromForm);
  if (req.user.role === "Translator") {
    Translator.findOneAndUpdate(
      { user: id },
      { $set: formattedFields.translatorModelFields },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating translator model data!");
        }
        User.findOneAndUpdate(
          { _id: id },
          { $set: formattedFields.userModelFields },
          { new: true },
          function(err, doc) {
            if (err) {
              console.log("Something wrong when updating user model data!");
            }
            res.redirect("/profile/show");
          }
        );
      }
    );
  } else if (req.user.role === "WO") {
    WO.findOneAndUpdate(
      { user: id },
      { $set: formattedFields.translatorModelFields },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating translator model data!");
        }
        User.findOneAndUpdate(
          { _id: id },
          { $set: formattedFields.userModelFields },
          { new: true },
          function(err, doc) {
            if (err) {
              console.log("Something wrong when updating user model data!");
            }
            res.redirect("/profile/show");
          }
        );
      }
    );
  }
});

module.exports = router;
