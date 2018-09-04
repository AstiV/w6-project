const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const WO = require("../models/WO");

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
      .exec(function(err, translator) {
        if (err) return handleError(err);
        res.render("profile", { translator });
      });
  }
});

module.exports = router;
