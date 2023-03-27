import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Play = new Schema(
  {
    name: { type: String, maxLength: 255 },
    content: { type: String },
    image: { type: String, maxLength: 255},
    slug: { type: String },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Play", Play);
