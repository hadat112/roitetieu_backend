import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Question = new Schema(
    {
        category: {type: String },
        type: { type: String },
        difficulty: { type: String },
        question: { type: String },
        correct_answer: { type: String },
        incorrect_answers: { type: [String] }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Question", Question);
