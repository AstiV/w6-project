module.exports = function formatFields(rawData) {
  const fields = Object.keys(rawData);
  let userModelFields = {};
  let translatorModelFields = {};
  fields.forEach((field, ind, arr) => {
    if (rawData[field].length > 0) {
      if (field === "username" || field === "email") {
        userModelFields[field] = rawData[field].trim();
      } else if (field === "price" && rawData[field][0] === "") {
      } else if (field === "language" || field === "level") {
      } else {
        translatorModelFields[field] = rawData[field];
      }
    }
  });
  if (rawData["language"]) {
    translatorModelFields["languages"] = languageFormatter(
      rawData["language"],
      rawData["level"]
    );
  }

  return {
    userModelFields,
    translatorModelFields
  };
};

function languageFormatter(langArr, lvlArr) {
  // input =>  [ 'Oromo', 'Maninka', 'Fula' ], [ 'B2', 'B1', 'B1' ]
  // output => [{language: "Oromo", level: "B2"}]
  let formattedLanguages = [];
  let uniqueLangs = new Set();
  //   var uniqueSet = new Set()
  // arr.forEach( (el, ind) => {
  //     if(!uniqueSet.has(el)){
  //         uniqueSet.add(el)
  //     } else {
  //         arr1.splice(ind, 1)
  //     }
  // })
  lvlArr = lvlArr.reverse();
  langArr.reverse().forEach((lang, ind) => {
    if (!uniqueLangs.has(lang)) {
      uniqueLangs.add(lang);
    } else {
      lvlArr.splice(ind, 1);
    }
  });
  lvlArr = lvlArr.reverse();
  langArr = Array.from(uniqueLangs);
  langArr.reverse().forEach((lang, ind) => {
    let currentLang = {};
    currentLang["language"] = lang;
    currentLang["level"] = lvlArr[ind];
    formattedLanguages.push(currentLang);
  });

  return formattedLanguages;
}
