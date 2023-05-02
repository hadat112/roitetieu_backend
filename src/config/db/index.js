import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect('mongodb+srv://root:echiMFEoqcNGepTO@cluster0.d8envkz.mongodb.net/?retryWrites=true&w=majority');
        console.log('success');
    } catch (error) {
        console.log(error);
    }
}
