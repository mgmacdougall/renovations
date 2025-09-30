import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './config/logger.js';
import { connectDB } from './config/db.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users.js';
import authRouter from './routes/authRoute.js';
import accountRoute from './routes/account.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';


dotenv.config();
const app = express();
connectDB()
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend Port
    credentials: true // Allow credentials to be sent
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/user', userRoutes);
app.use('/auth', authRouter);
app.use('/account', accountRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));