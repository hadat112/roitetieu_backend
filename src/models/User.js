import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        user_name: { type: String, unique: true, maxLength: 255 },
        // email: {
        //     type: String,
        //     unique: true,
        // },
        refresh_token: { type: String },
        password: {
            type: String,
            required: true
        },
        role: { type: Number, required: true},
        passwordConfirmation: {
            type: String,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Users", User);
