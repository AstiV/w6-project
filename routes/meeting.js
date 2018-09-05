const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

//use this middleware at every request to check if user is wo
router.use((req, res, next) => {
  //if there is not a running session with a user
  if (!req.user) {
    res.render("index", { message: "You must be logged in to view this page" });
  } else if (req.user.role !== "WO") {
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

router.post("/edit", (req, res) => {
  const woEmail = req.body.woEmail;
  const translatorEmail = req.body.translatorEmail;
  const {
    id,
    status,
    date,
    time,
    address,
    caseInfo,
    woStatus,
    translatorStatus
  } = req.body;
  let { participants } = req.body;
  participants = Array.from(participants).join("");
  //check if translator email exists
  User.findOne({ email: translatorEmail }).then(translator => {
    //check if wo email exists
    User.findOne({ email: woEmail })
      .then(wo => {
        //if both exist then update meeting
        Meeting.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              id,
              status,
              date,
              time,
              address,
              caseInfo,
              wo: wo._id,
              translator: translator._id,
              woStatus,
              translatorStatus,
              participants
            }
          },
          { new: true }
        )
          .then(meeting => {
            res.redirect(`/meeting/show/${id}`);
          })
          .catch(err => {
            //something went wrong with the editing of old data
            res.render(`meeting/index`, { message: err });
          });
      })
      .catch(err => {
        //if wo and translator email doesn't exist send err message to fe
        res.render(`meeting/index`, {
          message: "There is no user with that email. Please try a valid email."
        });
      });
  });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  Meeting.findById({ _id: id }).then(meeting => {
    meeting = meeting.toObject();
    meeting.participants = meeting.participants.split(",");
    res.render(`meeting/edit`, { meeting });
  });
});

router.get("/show/:id", (req, res) => {
  const { id } = req.params;
  Meeting.findById({ _id: id })
    .then(meeting => {
      meeting = meeting.toObject();
      meeting.participants = meeting.participants.split(",");
      res.render("meeting/show", { meeting });
    })
    .catch(console.error);
});
router.get("/create", (req, res) => {
  res.send("meeting create route");
});

module.exports = router;
