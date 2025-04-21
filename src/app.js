import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import config from "./config/config.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import routes from "./routes/route.js";

const app = express();

// Apply security middlewares
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // Limit each IP to 1000 requests per 15 minutes
    })
);

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (config.allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
app.use("/api/v1", routes);

// Test endpoint to verify server is working
app.get("/test", async (req, res) => {
    res.status(200).json({
        message: "Server working....!",
    });
});

app.get("/", (req, res) => {
    res.send("TechXen Server is running..!");
});

// Global error handler middleware
app.use(globalErrorHandler);

// Handle 404 - Not Found errors
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});

// Graceful shutdown on SIGTERM signal
process.on("SIGTERM", () => {
    process.exit(0);
});

export default app;
