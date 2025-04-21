import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { BlogServices } from "./blogs.services.js";

// Controller to create a new blog
const createBlog = asyncErrorHandler(async (req, res) => {
    // Call the createBlog service to handle the creation
    const result = await BlogServices.createBlog(req);

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Blog created successfully!",
        data: result,
    });
});

// Controller to get all blogs
const getAllBlogs = asyncErrorHandler(async (req, res) => {
    const result = await BlogServices.getAllBlogs();

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All blogs fetched successfully!",
        data: result,
    });
});

// Controller to get a single blog by ID
const getBlogById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.getBlogById(id);

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog fetched successfully!",
        data: result,
    });
});

// Controller to delete a blog by ID
const deleteBlog = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.deleteBlog(id);

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog deleted successfully!",
        data: result,
    });
});

export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
};