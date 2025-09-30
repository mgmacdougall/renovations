import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';
const accountRoute = express.Router();


accountRoute.get('/', verifyToken, (req, res) => {
    // Get the cookie
    const token = req.cookies.authToken;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).send({ message: `Logged in, welcome: ${decoded.username}` });
        } catch (e) {
            res.status(401).send({ message: "Sorry, incorrect credentials" });
        }
    } else {
        res.status(401).send({ message: "Authentication token not found" });
    }

})

export default accountRoute;