const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// sign up route
router.post('/signup', async (req, res) => {
    try {
	const {username, email, password} = req.body;
	const hashedPwd = await bcrypt.hash(password, 10);

	const newUser = new User({ username, email, password: hashedPwd });
	await newUser.save();

	res.status(200).json({ message: "User registered!" });
    } catch (error) {
	console.error(error);
	// res.status(400).json({ error: "Username or email already exists" });
    }
});

// sign in route
router.post('/login', async (req, res) => {
    try {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	// check to see if inputted password is same as the saved password
	if (user && await bcrypt.compare(password, user.password)) {
	    req.session.userId = user._id;
	    req.session.username = user.username;
	    return res.json({ success: true});
	}
	res.status(400).json({ error: "Invalid credentials" });
    } catch (error) {
	res.status(500).json({ error: "Server error during login "});
    }
});

// logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
	if (err) return res.redirect('/index.html');
	res.clearCookie('sid');
	res.redirect('/login.html');
    });
});

module.exports = router;
