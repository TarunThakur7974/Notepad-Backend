const mongoose = require('mongoose');


const admin = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password']
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: [true, 'Please enter a Password']
    }
},
    {
        timestamps: true
    })


module.exports = mongoose.model('admin', admin)