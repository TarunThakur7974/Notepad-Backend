const { signUp, login, getdata } = require('../Controller/register');
const router = require('express').Router();

router.post('/login', login)
// router.get('/login', getdata)
router.post('/signup', signUp)

module.exports = router