const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
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
  Meeting.find({}).then(meetings => {
    if (meetings.length < 1) {
      res.render("meeting/index", {
        message: "There are no meetings, please create one"
      });
    }

    res.render("meeting/index", { meetings });
  });
});

router.get("/show/:id", (req, res) => {
  const { id } = req.params;
  Meeting.findById({ _id: id })
    .then(meeting => {
      res.render("meeting/show", { meeting });
    })
    .catch(console.error);
});

module.exports = router;
