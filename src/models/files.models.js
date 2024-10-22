// files.models.js

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    // file: { type: String, required: true },
    filename: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: false },
    download_url: { type: String, required: false },
    fileSize: { type: String, required: false },
    uuid: { type: String, required: false },
  },
  { timestamps: true }
);

const Files = mongoose.model("File", fileSchema);

module.exports = Files;
