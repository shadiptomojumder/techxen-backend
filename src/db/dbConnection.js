import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB.");
        return;
    }

    try {
        const connectionInstance = await mongoose.connect(config.database_url);
        console.log(
            `MongoDB Connected !! DB HOST: ${connectionInstance.connection.host} DB NAME: ${connectionInstance.connection.name}`
        );
        console.log("Connection String:",connectionInstance.connection._connectionString);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED:", error);
        throw new Error("MongoDB connection failed");
        process.exit(1);
    }
};

export default connectDB;
