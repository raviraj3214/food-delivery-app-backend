const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.singleUpload = upload.single("file");


// Define the upload middleware
exports.uploadFiles = upload.fields([
    { name: 'file', maxCount: 1 },           // For the main file
    { name: 'verificationDocuments', maxCount: 1 } // For the verification file
]);