const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const { upload } = require("./utils/cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "adiya",
  api_key: "187739561284523",
  api_secret: "0q1sesGs0_NXVZYCxcqfIlLJOhM"
});

function upload(path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, function(result) {
      resolve(result);
    });
  });
}

module.exports = {
  upload
};
