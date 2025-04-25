import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { Project } from "./projects.model.js";

// Controller to create a new project
const createProject = asyncErrorHandler(async (req, res) => {
    const { title, banner, subtitle } = req.body;
    console.log("The request body is:", req.body);
    

    // Convert comma-separated tags into an array
    const tags = req.body.tags
        ? req.body.tags.split(",").map((tag) => tag.trim())
        : [];

    const project = await Project.create({
        title,
        banner,
        subtitle,
        tags,
    });

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Project created successfully!",
        data: project,
    });
});

// Controller to get all projects
const getAllProjects = asyncErrorHandler(async (req, res) => {
    const projects = await Project.find();

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All projects fetched successfully!",
        data: projects,
    });
});

// Controller to get a single project by ID
const getProjectById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Project not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project fetched successfully!",
        data: project,
    });
});

// Controller to update a project by ID
const updateProject = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { title, banner, subtitle, tags } = req.body;

    const project = await Project.findByIdAndUpdate(
        id,
        { title, banner, subtitle, tags },
        { new: true, runValidators: true }
    );

    if (!project) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Project not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project updated successfully!",
        data: project,
    });
});

// Controller to delete a project by ID
const deleteProject = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Project not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project deleted successfully!",
    });
});

export const ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};