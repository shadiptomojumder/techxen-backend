import { Blog } from "./blogs.model.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError.js";

// Service to create a new blog
const createBlog = async (req) => {
    try {
        const { title,description } = req.body;
        const blog = await Blog.create({
            banner: "https://example.com/banner.jpg", // Placeholder URL for the banner
            title,
            description,
            
        });
        return blog;
    } catch (error) {
        console.error("Error creating blog:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
        );
    }
};

// Service to get all blogs
const getAllBlogs = async () => {
    try {
        const blogs = await Blog.find()
        return blogs;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
        );
    }
};

// Service to get a single blog by ID
const getBlogById = async (id) => {
    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found");
        }
        return blog;
    } catch (error) {
        console.error("Error fetching blog:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
        );
    }
};

// Service to delete a blog by ID
const deleteBlog = async (id) => {
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found");
        }
        return blog;
    } catch (error) {
        console.error("Error deleting blog:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
        );
    }
};

export const BlogServices = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
};