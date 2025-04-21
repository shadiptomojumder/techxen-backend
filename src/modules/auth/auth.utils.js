import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

// Function to convert plain text password to hashed password
export const hashedPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

// Function to compare plain text password with hashed password
export const comparePasswords = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};

// Function to generate a JWT token
export const generateToken = (payload) => {
    if (!config.jwt.secret || !config.jwt.expires_in) {
        throw new Error(
            "JWT secret or expiration time is not defined in config"
        );
    }

    try {
        return jwt.sign(payload, config.jwt.secret, {
            algorithm: "HS256",
            expiresIn: config.jwt.expires_in,
        });
    } catch (error) {
        console.log("Error generating token:", error);
        throw new Error("Error generating token");
    }
};

// Function to verify a JWT token
export const verifyToken = (token) => {
    if (!config.jwt.secret) {
        throw new Error("JWT secret is not defined in config");
    }

    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Function to parse the EXPIRES_IN environment variable
// This function converts a string like "10m", "1h", or "7d" into milliseconds
export const parseExpiry = (expiresIn) => {
    if (!expiresIn) {
        console.warn("EXPIRES_IN is empty. Using default value of 10 minutes.");
        return 10 * 60 * 1000; // Default to 10 minutes
    }

    if (typeof expiresIn === "number") {
        return expiresIn * 1000; // Assume it's in seconds and convert to milliseconds
    }

    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error("Invalid EXPIRES_IN format. Use a format like '10m', '1h', '7d'.");
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case "s": return value * 1000;
        case "m": return value * 60 * 1000;
        case "h": return value * 60 * 60 * 1000;
        case "d": return value * 24 * 60 * 60 * 1000;
        default: throw new Error("Unsupported time unit in EXPIRES_IN");
    }
};

