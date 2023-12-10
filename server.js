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

app.use(cors({
    origin: 'https://notepad-five-tau.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.options('*', cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/notes', require('./Routes/notes'))
app.use('/user', require('./Routes/register'))

app.use(errorHandler)
app.listen(PORT, (req, res) => {
    console.log('server is running on port ' + PORT);
})



