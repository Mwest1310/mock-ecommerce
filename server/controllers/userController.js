import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// Auth user/set token
// POST /api/users/auth
// Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    };
});

// Register a new user
// POST /api/users
// Public
const registerUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const user = await User.create({
        username,
        password
    });
    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
});

// Logout user
// POST /api/users/logout
// Public
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ msg: 'User logged out' });
});

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username
    };
    res.status(200).json(user);
});

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.username = req.body.username || user.username;
        if(req.body.password) {
            user.password = req.body.password
        };
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    };
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };