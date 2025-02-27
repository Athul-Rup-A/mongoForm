const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    number: Number,
    place: String,
    image: String,
})

module.exports = mongoose.model("user", userSchema)
