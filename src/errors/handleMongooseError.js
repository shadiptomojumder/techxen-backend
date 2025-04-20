import { Error } from "mongoose";


// Function to handle Mongoose-related errors
const handleMongooseError = (error) => {
    let errors = [];
    let message = "An unexpected error occurred.";
    let statusCode = 500;

    // Logging the error using console in development and production
    if (error instanceof Error.ValidationError) {
        message = "Validation failed.";
        statusCode = 400;
        errors = Object.values(error.errors).map((err) => ({
            path: err.path,
            message: err.message,
        }));
        console.error(
            `Validation failed on field: ${errors
                .map((e) => e.path)
                .join(", ")}`
        );
    } else if (error instanceof Error.CastError) {
        message = `Invalid value for ${error.path}.`;
        statusCode = 400;
        errors = [{ path: error.path, message }];
        console.error(`Cast error on field: ${error.path}`);
    } else if (error.code === 11000) {
        message = "Duplicate key error.";
        statusCode = 409;
        errors = Object.keys(error.keyValue).map((key) => ({
            path: key,
            message: `${key} must be unique.`,
        }));
        console.error(`Duplicate key error: ${JSON.stringify(error.keyValue)}`);
    } else if (error.name === "DocumentNotFoundError") {
        message = "Requested document not found.";
        statusCode = 404;
        errors = [{ path: "", message }];
        console.warn("Document not found");
    } else if (error.name === "MongoServerError") {
        message = "Database server error.";
        statusCode = 500;
        console.error("MongoDB server error");
    }

    // General error logging
    console.error(`[Mongoose Error] ${message}`, { error });

    // Return a structured error response
    return {
        statusCode,
        message,
        errorMessages: errors.length ? errors : [{ path: "", message }],
    };
};

export default handleMongooseError;
