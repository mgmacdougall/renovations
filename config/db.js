import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async () => {
    // console.log('DSADSA', process.env.DB_USERNAME)
    let connectionString = ``
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