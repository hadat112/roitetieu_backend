import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/roinuoc_dev');
        console.log('success');
    } catch (error) {
        console.log(error);
    }
}
