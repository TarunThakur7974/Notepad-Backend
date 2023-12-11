const expressHandler = require("express-async-handler");
const User = require('../Models/user')
const Notes = require('../Models/notes');

const createNotes = expressHandler(async (req, res) => {
    const { title, description } = req.body;
    if (title && description && req.params.userId) {
        const checkAdmin = await User.findOne({ _id: req.params.userId }) 
        if (checkAdmin) {
            let createdNote = await Notes.create({ title, description, userId: req.params.userId })
            res.json(createdNote)
        } else {
            throw new Error("User Not found")
        }
    }
    else {
        throw new Error("Please Fill All Details");
    }
})


const UpdateOneNotes = expressHandler(async (req, res) => {
    const { title, description } = req.body;
    if (title && description && req.params.updateId) {
        const checkAdmin = await Notes.findById({ _id: req.params.updateId }) 
        if (checkAdmin) {
            let updatedNote = await Notes.findByIdAndUpdate(req.params.updateId, { title, description }, { new: true }) 
            res.json(updatedNote)
        } else {
            throw new Error("User Not found")
        }
    }
    else {
        throw new Error("Please Fill All Details");
    }
})


const ReadALLNotes = expressHandler(async (req, res) => {
    if (req.params.readAllId) {
        const getAllNotes = await Notes.find({ userId: req.params.readAllId }) 
        if (getAllNotes) {
            res.json(getAllNotes)
        } else {
            throw new Error("User Not found")
        }
    }
    else {
        throw new Error("Please Fill All Details");
    }
})


const DeleteOneNotes = expressHandler(async (req, res) => {
    if (req.params.deleteId) {
        const getAllNotes = await Notes.find({ userId: req.params.deleteId }) 
        if (getAllNotes) {
            await Notes.findByIdAndDelete(req.params.deleteId) 
            res.json({
                deleteId: req.params.deleteId,
                msg: "Notes deleted"
            })
        } else {
            throw new Error("User Not found")
        }
    }
    else {
        throw new Error("Please Fill All Details");
    }
})


const UpdateAllOneNotes = expressHandler(async (req, res) => {
    res.send("createUpdateOne")
})
const ReadOneNotes = expressHandler(async (req, res) => {
    res.send("createReadOne")
})
const DeleteAllNotes = expressHandler(async (req, res) => {
    res.send("createDeleteAll")
})

module.exports = { createNotes, DeleteAllNotes, DeleteOneNotes, UpdateOneNotes, UpdateAllOneNotes, ReadALLNotes, ReadOneNotes } 