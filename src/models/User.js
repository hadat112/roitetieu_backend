import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        user_name: { type: String, unique: true, maxLength: 255 },
        email: {
            type: String,
            unique: true,
        },
        user_id: { type: String },
        refresh_token: { type: String, unique: true },
        password: {
            type: String,
            required: true
        },
        passwordConfirmation: {
            type: String,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Users", User);
