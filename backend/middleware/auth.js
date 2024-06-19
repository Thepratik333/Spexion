// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?._id).select("-password");
        if (!user) return res.status(409).json({ msg: "Invalid access token" });
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
