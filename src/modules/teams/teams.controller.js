import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { Team } from "./teams.model.js";

// Controller to create a new team member
const createTeamMember = asyncErrorHandler(async (req, res) => {
    const { name, picture, designation } = req.body;

    const teamMember = await Team.create({
        name,
        picture,
        designation,
    });

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Team member created successfully!",
        data: teamMember,
    });
});

// Controller to get all team members
const getAllTeamMembers = asyncErrorHandler(async (req, res) => {
    const teamMembers = await Team.find();

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All team members fetched successfully!",
        data: teamMembers,
    });
});

// Controller to get a single team member by ID
const getTeamMemberById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const teamMember = await Team.findById(id);

    if (!teamMember) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Team member not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Team member fetched successfully!",
        data: teamMember,
    });
});

// Controller to update a team member by ID
const updateTeamMember = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { name, picture, designation } = req.body;

    const teamMember = await Team.findByIdAndUpdate(
        id,
        { name, picture, designation },
        { new: true, runValidators: true }
    );

    if (!teamMember) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Team member not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Team member updated successfully!",
        data: teamMember,
    });
});

// Controller to delete a team member by ID
const deleteTeamMember = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const teamMember = await Team.findByIdAndDelete(id);

    if (!teamMember) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Team member not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Team member deleted successfully!",
    });
});

export const TeamController = {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember,
};