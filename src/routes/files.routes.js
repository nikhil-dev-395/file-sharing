/*file.routes.js*/

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");
// files
const File = require("../models/files.models.js");
const { upload } = require("../middleware/upload.middleware.js");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;

//     cb(null, uniqueName);
//   },
// });

// let upload = multer({ storage, limits: { fileSize: 100000 * 100 } }).single(
//   "file"
// );


router.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    // validate request , is file uploaded or not

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "all fields are required",
      });
    }
    if (err) {
      return res.status(500).json({ err });
    }

    // store file

    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    return res
      .status(200)
      .json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });

  /* http://localhost:3000/files/9422983d-ac49-46da-84fb-48e0d527708d -- eg. how the filename will look in db*/

  // store into db
  // response - > link
});

module.exports = { fileRouter: router };
