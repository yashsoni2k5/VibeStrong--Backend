var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hiiii")
});






// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, 
       
    );

    res.status(201).json({ message: 'User registered successfully', token });
  
});

 
 



module.exports = router;
