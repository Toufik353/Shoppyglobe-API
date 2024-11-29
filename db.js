const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Shoppyglobe")
        console.log("MongoDB connection succesful")
    } catch (err) {
        console.error("Connection Failed", err)
    }
}
module.exports = connectDB