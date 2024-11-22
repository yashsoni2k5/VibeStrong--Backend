const express = require('express')
const router = express.Router();
const SignupLogin = require("../../controllers/signuplogin.Controller");
const {isUserAuth} = require('../../middleware/authuser')


router.route('/signup').post(SignupLogin.SignUp);

router.route('/login').post(SignupLogin.login);








module.exports = router;