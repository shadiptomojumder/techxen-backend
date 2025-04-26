import http from "http";
import app from "./src/app.js";
import connectDB from "./src/db/dbConnection.js";

// async function startServer() {
//     try {
//         // Connect to MongoDB
//         await connectDB();

//         // Use the port provided by Vercel or default to 3000
//         const PORT = process.env.PORT || 3000;

//         // Start the server
//         const server = http.createServer(app).listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });

//         // Function to handle server shutdown
//         const exitHandler = () => {
//             if (server) {
//                 server.close(() => {
//                     console.log("Server closed");
//                 });
//             }
//             process.exit(1);
//         };

//         // Function to handle unexpected errors
//         const unexpectedErrorHandler = (error) => {
//             console.log("Unexpected error occurred:", error);

//             exitHandler();
//         };

//         // Listen for uncaught exceptions and handle them
//         process.on("uncaughtException", unexpectedErrorHandler);

//         // Listen for unhandled promise rejections and handle them
//         process.on("unhandledRejection", unexpectedErrorHandler);

//         // Listen for SIGTERM signal and handle graceful shutdown
//         process.on("SIGTERM", () => {
//             console.log("SIGTERM received");
//             if (server) {
//                 server.close(() => {
//                     console.log("Server closed due to SIGTERM");
//                 });
//             }
//         });
//     } catch (error) {
//         console.log("Failed to start the server:", error);
//         // Exit the process with a failure code if the server fails to start
//         if (server) {
//             server.close(() => {
//                 console.log("Server closed due to startup failure");
//             });
//         }
//         // Exit the process with a failure code
//         process.exit(1);
//     }
// }

// startServer();

async function handler(req, res) {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
        console.log("MongoDB Connected inside Vercel function!");
    }
    app(req, res);
}

// Export the app instance for Vercel
export default app;