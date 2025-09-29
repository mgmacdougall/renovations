import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async () => {
    // console.log('DSADSA', process.env.DB_USERNAME)
    let connectionString = `mongodb+srv://mgmacdougall_db_user:xQ6hxXW5r7Iyxo62@main.qjc3zdh.mongodb.net/renovations?retryWrites=true&w=majority&appName=main`;
    // console.log('SSS', connectionString)
    try {
        await mongoose.connect(connectionString, {}
        );
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        console.log(PerformanceObserverEntryList.e)
        process.exit(1); // Exit process with failure
    }
};

export { connectDB }