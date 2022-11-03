const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    Title: { type: String, maxLength: 255 },
    Content: { type: String }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", Post);
