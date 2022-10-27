module.exports = {
    multiMongooseToObject: (mongooses) => {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: (mongoose) => {
        mongoose ? mongoose.toObject() : mongoose;
    }
}