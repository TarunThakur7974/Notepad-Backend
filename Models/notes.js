const mongoose = require('mongoose');

const user = require('./user')

const notes = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: user
    },
    title: {
        type: String,
        required: [true, "Please add a Title for the note"]
    },
    description: {
        type: String,
        required: [true, 'Please add a Description']
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('notes', notes)