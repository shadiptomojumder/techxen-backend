const asyncErrorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // console.error("Async Error Caught:", error); // Optional: log error for monitoring
            next(error); // Pass error to the global error handler
        }
    };
};

export default asyncErrorHandler;
