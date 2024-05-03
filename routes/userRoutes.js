const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../utils/authMiddleware');
const router = express.Router();

// POST /api/users/register
// Register a new user
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const newUser = new User({ username, email, password });
         await newUser.save();
        console.log('New User:', newUser);
        const token = jwt.sign(
          {
            id: newUser._id,
            email: newUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        res.json({ token, user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
      }

    });


// POST /api/users/login
// Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email);
console.log('Password:', password);
console.log('Request Body:', req.body);

    try {
        let user = await User.findOne({ email });
        console.log('User:', user.password);
        console.log(bcrypt.compareSync(password, user.password));
        if (!user ||  !bcrypt.compareSync(password, user.password)) {
            console.log('Stored Password Hash:', user.password);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // console.log(password);

        const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "5h",
            }
          );
          res.json({ token, user });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Internal server error" });
        }
      });
        

// GET /api/users/me
// Get user data using token
router.get('/me', auth, async (req, res) => {
    try {
        console.log('user.id', req.user.id);
        const user = await User.findById(req.user.id);
        console.log('User data:', user);
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;
