const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a Password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("signUp", user)
