const express = require('express')
const router = express.Router();
const SignupLogin = require("../../controllers/signup-loginController");
const {isUserAuth} = require('../../middleware/authuser')

router.post('/signup', SignupLogin.SignUp );

router.post('/login',SignupLogin.login);
router.route('/login').post(SignupLogin.login);








module.exports = router;