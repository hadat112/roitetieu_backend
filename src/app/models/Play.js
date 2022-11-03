const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Play = new Schema(
  {
    name: { type: String, maxLength: 255 },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Play", Play);
