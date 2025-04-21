import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import { ServiceSection } from "./services-section.model.js";

// Controller to create a new Service Section
const createServiceSection = asyncErrorHandler(async (req, res) => {
    const { title, description, banner, icon } = req.body;

    const serviceSection = await ServiceSection.create({
        title,
        description,
        banner,
        icon,
    });

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Service Section created successfully!",
        data: serviceSection,
    });
});

// Controller to get all Service Sections
const getAllServiceSections = asyncErrorHandler(async (req, res) => {
    const serviceSections = await ServiceSection.find();

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All Service Sections fetched successfully!",
        data: serviceSections,
    });
});

// Controller to get a single Service Section by ID
const getServiceSectionById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const serviceSection = await ServiceSection.findById(id);

    if (!serviceSection) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Service Section not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service Section fetched successfully!",
        data: serviceSection,
    });
});

// Controller to update a Service Section by ID
const updateServiceSection = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, banner, icon } = req.body;

    const serviceSection = await ServiceSection.findByIdAndUpdate(
        id,
        { title, description, banner, icon },
        { new: true, runValidators: true }
    );

    if (!serviceSection) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Service Section not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service Section updated successfully!",
        data: serviceSection,
    });
});

// Controller to delete a Service Section by ID
const deleteServiceSection = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const serviceSection = await ServiceSection.findByIdAndDelete(id);

    if (!serviceSection) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Service Section not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service Section deleted successfully!",
    });
});

export const ServiceSectionController = {
    createServiceSection,
    getAllServiceSections,
    getServiceSectionById,
    updateServiceSection,
    deleteServiceSection,
};