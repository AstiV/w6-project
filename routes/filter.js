const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const Translator = require("../models/Translator");

router.get("/", (req, res) => {
  Translator.find({}).then(translators => {
    // console.log(translators);

    const locations = Array.from(translators).map(translator => {
      // console.log(translator.location);
      // console.log(typeof JSON.stringify(translator.location));
      if (typeof JSON.stringify(translator.location) !== "undefined") {
        console.log(translator.location);

        return translator.location;
      }
    });

    console.log(locations);

    res.render("filter/index", { translators, locations });
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
