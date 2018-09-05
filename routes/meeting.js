const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

//use this middleware at every request to check if user is wo
router.use((req, res, next) => {
  //if there is not a running session with a user
  if (req.user.role !== "WO") {
    res.render("index", {
      message: "You must be logged in as Wellfare officer to create a meeting"
    });
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  res.render("meeting/index");
});

router.get("/show", (req, res) => {
  res.render("meeting/show");
});

module.exports = router;
