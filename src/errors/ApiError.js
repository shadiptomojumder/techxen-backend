class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong",
        stack = ""
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            name: this.name,
            statusCode: this.statusCode,
            message: this.message,
            ...(process.env.NODE_ENV === "development" && {
                stack: this.stack,
            }),
        };
    }
}

export default ApiError;
