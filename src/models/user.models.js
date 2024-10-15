// user.models.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: string, required: true },
    email: { type: string, required: true },
    password: { type: string, required: true },
    allFileLinks: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
  },
  { timestamps: true }
);

const Files = mongoose.model("File", userSchema);

module.exports = Files;
