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

  test("should be able to handle one language", () => {
    const input = {
      language: ["Oromo"],
      level: ["B2"]
    };
    const output = {
      translatorModelFields: {
        languages: [{ language: "Oromo", level: "B2" }]
      },
      userModelFields: {}
    };
    expect(formatFields(input)).toEqual(output);
  });
  test("should be able to handle one language", () => {
    const input = {
      username: "regfd",
      location: "rdas",
      language: ["Oromo", "Maninka"],
      level: ["B2", "B1"]
    };
    const output = {
      userModelFields: { username: "regfd" },
      translatorModelFields: {
        location: "rdas",
        languages: [
          { language: "Oromo", level: "B2" },
          { language: "Maninka", level: "B1" }
        ]
      }
    };
    expect(formatFields(input)).toEqual(output);
  });
  test("should not interfere with other fields", () => {
    const input = {
      language: ["Oromo", "Maninka"],
      level: ["B2", "B1"]
    };
    const output = {
      translatorModelFields: {
        languages: [
          { language: "Oromo", level: "B2" },
          { language: "Maninka", level: "B1" }
        ]
      },
      userModelFields: {}
    };
    expect(formatFields(input)).toEqual(output);
  });
  test("should be able to handle double languages", () => {
    const input = {
      language: ["Oromo", "Oromo"],
      level: ["B2", "C1"]
    };
    const output = {
      translatorModelFields: {
        languages: [{ language: "Oromo", level: "C1" }]
      },
      userModelFields: {}
    };
    expect(formatFields(input)).toEqual(output);
  });
});
