const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const Translator = require("../models/Translator");

router.get("/", (req, res) => {
  Translator.find({}).then(translators => {
    // allTranslators = allTranslat/ors.toObject();
    // console.log(allTranslators);
    res.render("filter/index", { translators });
  });
});

// server.post('/search', (req, res) => {
//     const { language, minRating, maxRating } = req.body

//     const andArray = [
//         { 'languages.language': language },
//     ]

//     if (minRating) {
//         andArray.push({ rating: { $gte: parseInt(minRating) } })
//     }

//     if (maxRating) {
//         andArray.push({ rating: { $lte: parseInt(maxRating) } })
//     }

//     // TODO add more search criteria if necessary

//     Translator.find(($and: andArray))
// })

router.post("/results", (req, res) => {
  const { language } = req.body;
  const filterConditions = { ...req.body };
  console.log(filterConditions);
  Translator.find({ "languages.language": language }).then(translators => {
    console.log(translators);
    res.render("filter/index", { translators });
  });
});

module.exports = router;
