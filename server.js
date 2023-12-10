let express = require('express');
const connectToDatabase = require('./db_config/db_config');
const cors = require('cors');
const { errorHandler } = require('./middleWare/errrorHandler');
const admin = require('./Models/admin');
const app = express();
const bcrypt = require('bcryptjs')
require('dotenv').config();
connectToDatabase();

const PORT = process.env.PORT || 8000
// app.use(cors({
//     origin: 'https://notepad-five-tau.vercel.app/' || "https://notepad-five-tau.vercel.app/**",
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 200,
// }));
// if(cors.origin){
//     console.log(cors.origin)
// }


const customCorsMiddleware = (req, res, next) => {
    const frontendDomain = req.get('Origin');

    if (frontendDomain && frontendDomain.includes('https://notepad-five-tau.vercel.app')) {
        res.header('Access-Control-Allow-Origin', frontendDomain);
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
};
app.use(customCorsMiddleware);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/notes', require('./Routes/notes'))
app.use('/user', require('./Routes/register'))

app.use(errorHandler)
app.listen(PORT, (req, res) => {
    console.log('server is running on port ' + PORT);
})



