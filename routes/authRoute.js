import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordCorrect = await userFound.comparePassword(password);
        console.log("Password match:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        const user = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        };
        console.log("User payload:", user);

        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PROD',
            maxAge: 3600000,
            sameSite: 'Lax'
        });

        return res.status(200).send({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).send({ message: "Internal server error" });
    }

})

authRouter.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: 'Lax'
    })
    res.status(200).json({ message: 'Logged out successfully' })
})


export default authRouter;