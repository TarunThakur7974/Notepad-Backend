const mongoose = require("mongoose");
require('dotenv').config()

const connectToDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.URI,  useNewUrlParser: true,
            useUnifiedTopology: true,  );
        console.log("connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDatabase  
