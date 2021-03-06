const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const fs = require("fs");
const User = require("../models/User");
const fileUpload = require("express-fileupload");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  req.logout();
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/profile/show",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("auth/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
