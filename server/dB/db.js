const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("MongoDB connected");

    } catch (error) {
        console.log("MongoDB connection ERROR", error);

    }
}

module.exports = db
