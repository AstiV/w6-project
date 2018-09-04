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
    Translator.findOne({ user: id })
      .populate("user")
      .then(translator => {
        res.render("profile", { translator });
      })
      .catch(console.error);
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
    Translator.findOne({ user: id })
      .populate("user")
      .then(translator => {
        res.render("edit", { translator });
      })
      .catch(console.error);
  }
});
router.post("/edit", (req, res) => {
  //TODO implement overwriting of db data
});

module.exports = router;
