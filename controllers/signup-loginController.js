
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret';

exports.SignUp = async (req, res) => {
    const { name, phone , email ,password } = req.body;
   
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Generate JWT
      const token = jwt.sign({ userId: newUser._id, name: newUser.name }, JWT_SECRET, 
         
      );
  
      res.status(201).json({ message: 'User registered successfully', token });
    
  }

  exports.login = async (req, res) => {
    const {phone, password } = req.body;
  
    try {
        // Validate input
        if (!phone || !password) {
            return res.status(400).json({ message: 'phone number and password are required' });
        }
  
        // Find user by username
        const user = await User.findOne({ phone});
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET,);
  
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
  }


  