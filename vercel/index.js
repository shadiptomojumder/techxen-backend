import app from "../src/app.js";
import connectDB from "../src/db/dbConnection.js";
import serverless from "serverless-http";

// Connect to DB when function is first loaded 
await connectDB();

export const handler = serverless(app);
