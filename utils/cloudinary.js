const cloudinary = require("cloudinary").v2;
// console.log("Cloudinary Config:");
// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("API_KEY:", process.env.API_KEY);
// console.log("API_SECRET:", process.env.API_SECRET);


cloudinary.config({
    cloud_name: `dj1lu8pd8`,
    api_key: `854579147973377`,
    api_secret: `wSaBPmgP3Q0Cyj7jxFAw88sc2x8`
});
module.exports = cloudinary;


