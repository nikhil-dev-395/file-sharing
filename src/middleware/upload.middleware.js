const multer = require("multer");
const path = require("path");

// storage - a place where our file going to store

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limits: { fileSize: 100000 * 100 } }).single(
  "file"
);

module.exports = { upload };
