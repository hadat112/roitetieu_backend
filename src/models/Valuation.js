import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Valuation = new Schema({});

export default mongoose.model("Valuation", Valuation, 'valuation');
