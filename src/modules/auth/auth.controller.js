import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { StatusCodes } from "http-status-codes";
import { AuthServices } from "./auth.services.js";
import ApiResponse from "../../utils/ApiResponse.js";
import config from "../../config/config.js";
import { parseExpiry } from "./auth.utils.js";

// Controller function to handle user signup
const signup = asyncErrorHandler(async (req, res) => {
    // Call the signup service to create a new user
    const result = await AuthServices.signup(req);

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User created successfully!",
        data: result,
    });
});

// Controller function to handle user login
const login = asyncErrorHandler(async (req, res) => {
    // Call the login service to authenticate the user
    const result = await AuthServices.login(req);
    const { accessToken, user } = result.data;

    // Set the refresh token into a cookie with secure and httpOnly options
    const cookieOptions = {
        httpOnly: true,
        secure: config.env === "production",
        maxAge: parseExpiry(config.jwt.expires_in || "10m"), 
        sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOptions);

    // Send a response with the user data and tokens
    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully!",
        data: {
            user: { ...user },
            accessToken,
        },
    });
});

// Controller function to handle user logout
const logout = async (req, res) => {
    try {
        const token =
            req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]; // Bearer <token>

        // Define secure cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: config.env === "production",
            path: "/", // Ensure cookies are cleared for the entire site
        };

        // Clear the access token from cookies
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        // Send a proper logout success response
        ApiResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "User logged out successfully!",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        ApiResponse(res, {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An unexpected error occurred during logout.",
        });
    }
};

export const AuthController = {
    signup,
    login,
    logout
};
