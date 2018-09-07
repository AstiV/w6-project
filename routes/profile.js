const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Translator = require("../models/Translator");
const WO = require("../models/WO");
const User = require("../models/User");
const formatFields = require("../utils/editFormFormatting");
const fileUpload = require("express-fileupload");
const { upload } = require("../utils/cloudinary");
const fs = require("fs");

//use this middleware at every request to check if user is logged in
router.use((req, res, next) => {
  //if there is not a running session with a user
  if (!req.user) {
    res.render("index", {
      message: "You must be logged in to view this page"
    });
  } else {
    next();
  }
});

router.use(fileUpload());

router.get("/show", (req, res) => {
  const { id } = req.user;
  if (req.user.role === "WO") {
    WO.findOne({ user: id })
      .populate("user")
      .then(wo => {
        res.render("profile/show", { wo });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translatorRaw => {
      let translator = { ...translatorRaw }._doc;

      if (translator.background) {
        translator.background = translator.background.split(", ");
      }

      if (translator.preferedSetting) {
        translator.preferedSetting = translator.preferedSetting.split(", ");
      }

      res.render("profile/show", {
        translator,
        isProfessional: translator.role === "Professional"
      });
    });
  }
});

router.get("/edit", (req, res) => {
  const { id } = req.user;

  if (req.user.role === "WO") {
    WO.findOne({ user: id })
      .populate("user")
      .then(wo => {
        res.render("profile/edit", { wo, isWO: wo.role === "WO" });
      })
      .catch(console.error);
  } else if (req.user.role === "Translator") {
    Translator.findOne({ user: id }).then(translator => {
      res.render("profile/edit", {
        translator,
        isProfessional: translator.role === "Professional"
      });
    });
  }
});
router.post("/edit", (req, res) => {
  //TODO implement overwriting of db data
  const { id } = req.user;
  const dataFromForm = req.body;
  const formattedFields = formatFields(dataFromForm);
  let profileImageName;
  let pictureWasUploaded = false;

  if (req.user.role === "Translator") {
    if (Object.keys(req.files).length > 0) {
      uploadPicture({
        req,
        formattedFields,
        id,
        pictureWasUploaded,
        profileImageName,
        res
      });
    } else {
      console.log("translator -> create translator");
      createTranslator({
        id,
        formattedFields,
        pictureWasUploaded,
        profileImageName,
        res
      });
    }
  } else if (req.user.role === "WO") {
    WO.findOneAndUpdate(
      { user: id },
      { $set: formattedFields.translatorModelFields },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating translator model data!");
        }
        User.findOneAndUpdate(
          { _id: id },
          { $set: formattedFields.userModelFields },
          { new: true },
          function(err, doc) {
            if (err) {
              console.log("Something wrong when updating user model data!");
            }
            res.redirect("/profile/show");
          }
        );
      }
    );
  }
});

function createTranslator(arg) {
  const { formattedFields, id, profileImageName, res } = arg;
  let { pictureWasUploaded } = arg;
  console.log("id", id);
  console.log("create translator -> ", formattedFields.translatorModelFields);
  const {
    role,
    rating,
    price,
    profileImageUrl,
    location,
    languages
  } = formattedFields.translatorModelFields;
  Translator.findOneAndUpdate(
    { user: id },
    {
      $set: {
        profileImageUrl: formattedFields.translatorModelFields.profileImageUrl
      }
    },
    { new: true },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating translator model data!");
      }
      console.log(doc);
      User.findOneAndUpdate(
        { _id: id },
        { $set: formattedFields.userModelFields },
        { new: true },
        function(err, doc) {
          if (err) {
            console.log("Something wrong when updating user model data!");
          }
          if (pictureWasUploaded) {
            fs.unlinkSync(`./public/images/${profileImageName}`);
            pictureWasUploaded = false;
          }
          res.redirect("/profile/show");
        }
      );
    }
  );
}

function uploadPicture(arg) {
  console.log("picture upload");
  const { req, formattedFields, id, res } = arg;
  let { pictureWasUploaded, profileImageName } = arg;
  pictureWasUploaded = true;

  let profileImage = req.files.profileImageUrl;
  profileImageName = req.files.profileImageUrl.name;
  // Use the mv() method to place the file somewhere on your server
  profileImage.mv(`./public/images/${profileImageName}`, function(err) {
    if (err) return res.status(500).send(err);
    upload(`./public/images/${profileImageName}`).then(result => {
      formattedFields.translatorModelFields["profileImageUrl"] =
        result.secure_url;
      //   console.log(formattedFields);

      createTranslator({
        id,
        formattedFields,
        pictureWasUploaded,
        profileImageName,
        res
      });
    });
  });
}

module.exports = router;
