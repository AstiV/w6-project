const formatFields = require("./editFormFormatting");

describe("Field formatter", () => {
  test("the output is an object", () => {
    const input = {
      username: "regfd",
      price: ["", ""],
      email: "rgeqd",
      telephone: "",
      location: "rdas",
      language: "",
      level: "",
      background: "",
      preferedSetting:
        "Remove bullshit text, add some proper text, blah, fewdsc"
    };
    const output = {
      userModelFields: { username: "regfd", email: "rgeqd" },
      translatorModelFields: {
        location: "rdas",
        preferedSetting:
          "Remove bullshit text, add some proper text, blah, fewdsc"
      }
    };
    expect(formatFields(input)).toEqual(output);
  });

  //   test("Languages should be in a format that can be passed to the db", () => {
  //     const input = {
  //       language: "Oromo",
  //       level: "A1"
  //     };
  //     const output = {
  //       translatorModelFields: {
  //         location: "rdas",
  //         preferedSetting:
  //           "Remove bullshit text, add some proper text, blah, fewdsc"
  //       }
  //     };
  //   });
});
