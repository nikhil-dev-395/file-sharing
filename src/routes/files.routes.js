/*file.routes.js*/

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");
// files
const File = require("../models/files.models.js");
const { upload } = require("../middleware/upload.middleware.js");

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
