import express from "express";
import { BlogController } from "./blogs.controller.js";

// Create a new Express router
const router = express.Router();

// Route to create a new blog
router.post("/", BlogController.createBlog);

// Route to get all blogs
router.get("/", BlogController.getAllBlogs);

// Route to get a single blog by ID
router.get("/:id", BlogController.getBlogById);

// Route to delete a blog by ID
router.delete("/:id", BlogController.deleteBlog);

const BlogRoutes = router;

export { BlogRoutes };
