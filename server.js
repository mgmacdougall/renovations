import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './config/logger.js';
import { connectDB } from './config/db.js';
import mongoose from 'mongoose';
import User from './models/users.js';
import passport from 'passport';
// import userRoutes from './routes/users.js';
// import projectRoutes from './routes/projects.js';
// import './config/passport.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import { all } from 'axios';

dotenv.config();
const app = express();
connectDB()
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


// App routes
app.get('/', (req, res) => {
    res.send({ message: "OK" })
})

// Create a user in the DB
app.post('/user', async (req, res) => {
    try {
        const { username, email, password } = req.body; // Assuming the meal plan is sent in the request body
        if (username) {
            let newUser = new User({ username, email, password })
            await newUser.save()
            return res.status(201).json({ message: 'User saved successfully', newUser });
        } else {
            throw new Error({ message: "Error encountered" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error saving user', error: error.message });
    }
})

// Get all system users
app.get('/user', async (req, res) => {
    try {
        const allUsers = await User.find();
        if (allUsers) {
            res.send(allUsers);
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.get('/user/search', async (req, res) => {

    const { uname, uemail } = req.query;
    try {

        if (uname && uemail) {
            const userFound = await User.find({ username: uname, email: uemail })
            if (userFound) {
                res.json({ message: "User found" })
            }


        } else {
            res.send(404).json({ message: "no user found" })
        }
    } catch (e) {
        res.status(404).send(e)
    }
    res.status(200).json({ message: "okay" })
})

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    if (userId) {
        try {
            const _user = await User.findById(userId);
            res.send(_user);
        } catch (e) {
            res.status(404).status(e)
        }
    }




})
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));