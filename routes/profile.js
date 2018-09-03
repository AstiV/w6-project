const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");

router.get("/show", (req, res) => {
  Translator.getLoginData().then(translatorData => {
    res.render("profile", { translator: true, translatorData });
  });
});

module.exports = router;
