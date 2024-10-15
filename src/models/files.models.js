// files.models.js

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    // file: { type: string, required: true },
    filename: { type: string, required: true },
    sender: { type: string, required: true },
    receiver: { type: string, required: false },
    download_url: { type: string, required: false },
    fileSize: { type: string, required: false },
    uuid: { type: string, required: false },
  },
  { timestamps: true }
);

const Files = mongoose.model("File", fileSchema);

module.exports = Files;
