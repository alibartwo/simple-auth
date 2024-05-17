const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

router.get('/', (req, res) => { 
    res.render('index'); 
});

router.get('/register', (req, res) => { 
    res.render('register'); 
});

router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.getUserById(req.id);
    res.render('profile', { user });
});

module.exports = router;