const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const WO = require("../models/WO");

router.get("/show", (req, res) => {
  const { id } = req.user;
  if (req.user.role === "WO") {
    WO.findOne({ loginData: id })
      .populate("loginData")
      .exec(function(err, wo) {
        if (err) return handleError(err);
        res.render("profile", { wo });
      });
  } else if (req.user.role === "Translator") {
    Translator.findOne({ loginData: id })
      .populate("loginData")
      .exec(function(err, translator) {
        if (err) return handleError(err);
        res.render("profile", { translator });
      });
  }
});

module.exports = router;
