import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        username: { type: String },
        post_id: { type: String },
        content: { type: String },
    },
    { timestamps: { createdAt: "created_at" } },
    {
        versionKey: false,
    }
);

export default mongoose.model("Comment", Comment);
