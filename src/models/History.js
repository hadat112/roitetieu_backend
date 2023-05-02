import mongoose from "mongoose";

const Schema = mongoose.Schema;

const History = new Schema({});

export default mongoose.model("history", History, 'history');
