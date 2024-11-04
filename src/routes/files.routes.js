/*   src/routes/file.routes.js*/

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { Dropbox } = require("dropbox");
const fetch = require("isomorphic-fetch");
const { v4: uuid4 } = require("uuid");
const fs = require("fs");

// FILES
const File = require("../models/files.models.js");
const { upload, dropbox } = require("../middleware/upload.middleware.js");

// router.post("/upload", (req, res) => {
//   upload(req, res, async (err) => {
//     // validate request , is file uploaded or not

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         error: "all fields are required",
//       });
//     }
//     if (err) {
//       return res.status(500).json({ err });
//     }

//     // Upload file to Dropbox
//     const dropbox_response = await dropbox.filesUpload({
//       path: "/" + req.file.originalname, // Specify the path where the file will be stored in Dropbox
//       contents: req.file.buffer, // The contents of the uploaded file
//     });

//     // store file
//     const file = new File({
//       filename: req.file.filename,
//       uuid: uuid4(),
//       path: req.file.path,
//       size: req.file.size,
//     });

//     const response = await file.save();
//     return res.status(200).json({
//       file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
//       message: "File uploaded successfully",
//       data: dropbox_response,
//     });
//   });

//   /* http://localhost:3000/files/9422983d-ac49-46da-84fb-48e0d527708d -- eg. how the filename will look in db*/

//   // store into db
//   // response - > link
// });

// const storage = multer.memoryStorage(); // Use memory storage
// let upload = multer({ storage, limits: { fileSize: 100000 * 100 } }).single(
//   "file"
// );

router.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "all fields are required" });
    }
    if (err) {
      return res.status(500).json({ success: false, err });
    }

    try {
      // Read file content from disk
      const fileContent = fs.readFileSync(req.file.path);

      // Upload file to Dropbox with the file content
      const dropbox_response = await dropbox.filesUpload({
        path: "/" + req.file.filename,
        contents: fileContent, // Use file content from disk
      });

      // Get a temporary download link for the uploaded file
      const downloadLinkResponse = await dropbox.filesGetTemporaryLink({
        path: dropbox_response.result.path_display,
      });

      // Save file metadata to the database, including the download link
      const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size,
        download_url: downloadLinkResponse.result.link, // Store the download link
      });

      const response = await file.save();
      return res.status(200).json({
        success: true,
        file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
        message: "File uploaded successfully",
        download_url: downloadLinkResponse.result.link,
        data: dropbox_response,
      });
    } catch (uploadError) {
      console.error("Dropbox upload error:", uploadError);
      res.status(500).json({ success: false, error: "Dropbox upload failed" });
    }
  });
});

router.post("/send", async (req, res) => {
  try {
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
      res.status(422).send("all fields are required!");
    }
    // get file from database

    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      res.status(422).send("email already sent");
    }
    file.sender = emailFrom;
    file.receiver = emailTo;
    await file.save();

    // send email

    const sendEmail = require("../services/emailService.services.js");
    sendEmail({
      from: emailFrom,
      to: emailTo,
      subject: "wolf share file sharing",
      text: ` ${emailFrom} shared a file with you...`,
      html: require("../services/emailTemplate.services.js")({
        emailFrom: emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: parseInt(file.size / 1000) + "kb",
        expires: "24 hrs",
      }),
    });

    return res.status(200).json({
      success: true,
      message: "email was successfully sent",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { fileRouter: router };
