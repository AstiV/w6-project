module.exports = function formatFields(rawData) {
  const fields = Object.keys(rawData);
  let userModelFields = {};
  let translatorModelFields = {};
  fields.forEach((field, ind, arr) => {
    if (rawData[field].length > 0) {
      if (field === "username" || field === "email") {
        userModelFields[field] = rawData[field].trim();
      } else {
        translatorModelFields[field] = rawData[field];
      }
    }
  });
  return {
    userModelFields,
    translatorModelFields
  };
};
