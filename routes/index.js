// var express = require('express');

// var router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/UserModel');
// const jwt = require('jsonwebtoken')
// const JWT_SECRET = 'secret';
// import hiii from"./user/hiii";
// /* GET home page. */

// router.get('/', function(req, res, next) {
//   res.send("hiiii")
// });

// router.use("/", hiii);





// // Signup Route
// router.post('/signup', async (req, res) => {
//   const { username, password } = req.body;


//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Generate JWT
//     const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, 
       
//     );

//     res.status(201).json({ message: 'User registered successfully', token });
  
// });

 
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//       // Validate input
//       if (!username || !password) {
//           return res.status(400).json({ message: 'username and password are required' });
//       }

//       // Find user by username
//       const user = await User.findOne({ username });
//       if (!user) {
//           return res.status(401).json({ message: 'Invalid username or password' });
//       }

//       // Compare password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET,);

//       res.status(200).json({
//           message: 'Login successful',
//           token,
//       });
//   } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });




// module.exports = router;

const express = require('express')

const slash=  require("./user/slash");
const LoginSignUp = require("./user/LoginSignUp")
const businessCrud = require('./business/CRUD')
const router = express.Router();


router.use("/user",LoginSignUp);
router.use('/business',businessCrud);
router.use("/", slash);

module.exports = router;