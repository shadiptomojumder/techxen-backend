import config from "../config/config.js";
import mongoose from "mongoose";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError.js";
import handleZodError from "../errors/handleZodError.js";
import handleMongooseError from "../errors/handleMongooseError.js";

// Global error handler middleware
const globalErrorHandler = (error, req, res, next) => {
    // Log the error based on the environment
    if (config.env === "development") {
        console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, error);
    } else {
        console.log(`[ERROR] ${req.method} ${req.originalUrl || "unknown"}:`, {
            message: error.message,
            stack: error.stack,
        });
    }

    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];

    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
        const simplifiedError = handleMongooseError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Handle Zod validation errors
    else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Handle custom API errors
    else if (error instanceof ApiError) {
        statusCode = error?.statusCode ?? 500;
        message = error.message;
        errorMessages = error?.message
            ?   [
                    {
                        path: req.originalUrl,
                        message: error?.message,
                    },
                ]
            : [];
    }
    // Handle general and unexpected errors
    else {
        const unknownError = error;
        statusCode = statusCode !== 500 ? statusCode : 500; // Prevents overriding existing status codes
        message = unknownError.message || "An unexpected error occurred";
        errorMessages = [
            {
                path: req.originalUrl,
                message: message,
            },
        ];
    }

    // Send the error response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: config.env === "development" ? error.stack : undefined, // Only show stack trace in development
    });
};

export default globalErrorHandler;
