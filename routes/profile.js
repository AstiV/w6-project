const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const WO = require("../models/WO");

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
        res.render("profile", { wo });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translatorRaw => {
      let translator = { ...translatorRaw }._doc;
      translator.background = translator.background.split(", ");
      translator.preferedSetting = translator.preferedSetting.split(", ");
      res.render("profile", { translator });
    });
  }
});

router.get("/edit", (req, res) => {
  const { id } = req.user;

  if (req.user.role === "WO") {
    WO.findOne({ user: id })
      .populate("user")
      .then(wo => {
        res.render("edit", { wo });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translator => {
      res.render("edit", {
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
  const fields = Object.keys(dataFromForm);
  let filledFields = [];
  fields.forEach((field, ind, arr) => {
    let notEmptyField = {};
    notEmptyField[field] = dataFromForm[field];
    if (dataFromForm[field].length > 0) {
      filledFields.push(notEmptyField);
    }
  });
  filledFields = filledFields[0];

  Translator.findOneAndUpdate(
    { user: id },
    { $set: filledFields },
    { new: true },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      res.redirect("/profile/show");
      console.log(doc);
    }
  );
});

module.exports = router;
