const createTranslator = require("./userCreation");
const { createUser } = require("./userCreation");
const User = require("../models/User");
const Translator = require("../models/Translator");

describe("user creation", () => {
  test("a new user should be created in the db", () => {
    //username, email, password, role
    const userData = {
      username: "jestTest",
      email: "jestTest@email.com",
      password: "test",
      role: "translator"
    };

    const output = {
      username: "jestTest",
      email: "jestTest@email.com",
      password: "test",
      role: "translator"
    };

    expect(createUser(userData)).toEqual(output);
  });
});
