// get our api keys and DB URI
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// import all routes
const authRoute = require('./routes/auth');
const tutorRoute = require('./routes/tutor');

const app = express();
const PORT = process.env.PORT || 3000;

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
	maxAge: 1000 * 60 * 60 * 2,
    }
}));

// connect to our database (which is mongodb)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// error handling
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
	res.redirect('/login.html');
    } else {
	next();
    }
};

// serve static folder
app.use(express.static(path.join(__dirname, 'public')));

// get the routes and html files
app.use('/api', authRoute);
app.use('/api/tutor', tutorRoute);

app.get('/index.html', redirectLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', redirectLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start the server
app.listen(PORT, () => console.log(`Tutor server running on port ${PORT}`));
