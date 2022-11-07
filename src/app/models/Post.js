const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, maxLength: 255 },
    content: { type: String },
    slug: { type: String },
  },
  { timestamps: { createdAt: "created_at" } },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", Post);
