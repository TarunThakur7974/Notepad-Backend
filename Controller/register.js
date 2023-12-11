const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const admin = require('../Models/admin');
const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const checkAdmin = await admin.findOne({ email })
        const existsUser = await User.findOne({ email: req.body.email }) 
        if (existsUser || checkAdmin) {
            throw new Error("user already exists")
        } else {
            const hashpass = await bcrypt.hash(password, 10)
            let user = await User.create({ name, email, password: hashpass }) 
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: false,
            });
        }
    }
    else {
        throw new Error("Please Fill All Details");
    }
})



const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email && password ) {
        const checkAdmin = await admin.findOne({ email }) 
        if (checkAdmin && (await bcrypt.compare(password, checkAdmin.password))) {
            const allNotes = await User.find() 
            res.json({
                admin: {
                    _id: checkAdmin._id,
                    adminName: checkAdmin.name,
                    adminEmail: checkAdmin.email
                },
                allNotes: allNotes.map((item) => {
                    return {
                        _id: item._id,
                        userName: item.name,
                        userEmail: item.email,
                        UserisAdmin: false,
                    }
                })
            })
        } else {
            const existsUser = await User.findOne({ email }) 
            if (existsUser && (await bcrypt.compare(password, existsUser.password))) {
                res.json(
                    {
                        _id: existsUser._id,
                        userName: existsUser.name,
                        userEmail: existsUser.email,
                        UserisAdmin: false,
                    }
                )
            } else {
                throw new Error("Invalid Credentials");
            }
        }
    } else {
        throw new Error("Please Fill All Details");
    }
})



const getdata = async (req, res) => {
    const user = await User.find() 
    res.json(user);
}

module.exports = { login, signUp, getdata }