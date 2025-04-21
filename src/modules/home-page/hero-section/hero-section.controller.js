import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import { HeroSection } from "./hero-section.model.js";

// Controller to create or update the Hero Section
const upsertHeroSection = asyncErrorHandler(async (req, res) => {
    const { quote, title } = req.body;

    // Convert comma-separated string into array (if it exists)
    const services = req.body.services
        ? req.body.services.split(",").map((item) => item.trim())
        : [];

    // Upsert (update if exists, otherwise create)
    const result = await HeroSection.findOneAndUpdate(
        {}, // Match all documents (only one HeroSection is expected)
        { quote, title, services },
        { new: true, upsert: true } // Create if not found, return the updated document
    );

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Hero Section updated successfully!",
        data: result,
    });
});


// Controller to get the Hero Section
const getHeroSection = asyncErrorHandler(async (req, res) => {
    const result = await HeroSection.find(); // Fetch the single HeroSection document

    if (!result) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Hero Section not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Hero Section fetched successfully!",
        data: result,
    });
});

// Controller to delete the Hero Section
const deleteHeroSection = asyncErrorHandler(async (req, res) => {
    const result = await HeroSection.deleteOne(); // Delete the single HeroSection document

    if (result.deletedCount === 0) {
        return ApiResponse(res, {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Hero Section not found.",
        });
    }

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Hero Section deleted successfully!",
    });
});

export const HeroSectionController = {
    upsertHeroSection,
    getHeroSection,
    deleteHeroSection,
};