import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, maxLength: 255 },
    content: { type: String },
    slug: { type: String },
    type: { type: String, maxLength: 50 },
    count: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: "created_at" } },
  {
    versionKey: false,
  }
);

export default mongoose.model("Post", Post);
