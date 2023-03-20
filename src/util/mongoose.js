
export const multiMongooseToObject = (mongooses) => {
    return mongooses.map(mongoose => mongoose.toObject());
}

export const mongooseToObject = (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
}