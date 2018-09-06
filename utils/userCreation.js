const User = require("../models/User");
const Translator = require("../models/Translator");
const WO = require("../models/WO");
const bcrypt = require("bcrypt");

function createWO(userId) {
  // console.log(userId);
  return new Promise((resolve, reject) => {
    new WO({
      user: userId
    })
      .save()
      .then(result => {
        console.log(result);
        if (result) resolve(result);
        else reject("There was an error with translator creation");
      });
  });
}
function createTranslator(userId) {
  // console.log(userId);
  return new Promise((resolve, reject) => {
    new Translator({
      user: userId
    })
      .save()
      .then(result => {
        console.log(result);
        if (result) resolve(result);
        else reject("There was an error with translator creation");
      });
  });
}

function createUser(userData) {
  const { username, email, password, role, name } = userData;
  console.log(userData);
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return new Promise((resolve, reject) => {
    new User({
      username,
      email,
      password: hashPass,
      role,
      name
    })
      .save()
      .then(user => {
        console.log(user);
        if (user) resolve(user);
        else reject("error in user creation");
      });
  });
}

module.exports = { createTranslator, createUser, createWO };
