import express from "express";
import { AuthController } from "./auth.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

// Create a new Express router
const router = express.Router();

// Define the signup route
router.post("/signup", AuthController.signup);

// Define the login route
router.post("/login", AuthController.login);

// Define the logout route
router.post("/logout", AuthController.logout);

const AuthRoutes = router;

export { AuthRoutes };
