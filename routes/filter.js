const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const Translator = require("../models/Translator");

router.get("/", (req, res) => {
  Translator.find({}).then(translators => {
    res.render("filter/index", { translators });
  });
});

router.post("/results", (req, res) => {
  const { language, minRating } = req.body;
  const filterConditions = [];

  if (language) {
    filterConditions.push({ "languages.language": language });
  }

  if (minRating) {
    filterConditions.push({ rating: { $gte: parseInt(minRating) } });
  }

  Translator.find({ $and: filterConditions }).then(translators => {
    if (translators.length > 0) {
      res.render("filter/index", { translators });
    } else {
      res.render("filter/index", {
        message:
          "There are no translators that fit your search query. Please adjust it and try again."
      });
    }
  });
});

module.exports = router;
