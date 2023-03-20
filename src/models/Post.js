import mongoose from "mongoose";

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

export default mongoose.model("Post", Post);
