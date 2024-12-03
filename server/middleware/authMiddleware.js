import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
    let token;

    // Creates a cookie token
    token = req.cookies.jwt;

    // If there is a token, then it is decoded and used to find the user. The password is excluded for security
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorised, invalid token');
        };
    } else{
        res.status(401);
        throw new Error('Not authorised, no token');
    };
});

export { protect };