import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Play = new Schema(
  {
    name: { type: String, maxLength: 255 },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Play", Play);
