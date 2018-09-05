module.exports = function formatFields(rawData) {
  console.log(rawData);
  const fields = Object.keys(rawData);
  let userModelFields = {};
  let translatorModelFields = {};
  fields.forEach((field, ind, arr) => {
    if (rawData[field].length > 0) {
      if (field === "username" || field === "email") {
        userModelFields[field] = rawData[field].trim();
      } else if (field === "price" && rawData[field][0] === "") {
      } else {
        translatorModelFields[field] = rawData[field];
      }
    }
  });
  console.log({
    userModelFields,
    translatorModelFields
  });
  return {
    userModelFields,
    translatorModelFields
  };
};
