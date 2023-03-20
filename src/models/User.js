import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        user_name: { type: String, maxLength: 255 },
        user_id: { type: String },
        refresh_token: {type: String},
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Users", User);
