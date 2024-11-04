// files.models.js

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    // file: { type: String, required: true },
    filename: { type: String, required: false },
    path: { type: String, required: true },
    size: { type: Number, required: false },
    uuid: { type: String, required: false },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
    download_url: { type: String, required: false },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
