import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { GalleryServices } from "./gallery.services.js";

// Controller function to upload images to the gallery
const upload = asyncErrorHandler(async (req, res) => {
    // Call the upload service to handle the image upload
    const result = await GalleryServices.upload(req);

    ApiResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Image uploaded successfully!",
        data: result,
    });
});

// Controller function to get all images from the gallery
const getAllImages = asyncErrorHandler(async (req, res) => {
    // Call the service to get all images from the gallery
    const result = await GalleryServices.getAllImages(req);

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All images fetched successfully!",
        data: result,
    });
});

// Controller function to delete an image from the gallery
const deleteImage = asyncErrorHandler(async (req, res) => {
    // Call the deleteImage service to handle the deletion
    const result = await GalleryServices.deleteImage(req);

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Image deleted successfully!",
        data: result,
    });
});

// Controller function to get a single image from the gallery
const getSingleImage = asyncErrorHandler(async (req, res) => {
    // Call the getSingleImage service to fetch the image
    const result = await GalleryServices.getSingleImage(req);

    ApiResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Image fetched successfully!",
        data: result,
    });
});

export const GalleryController = {
    upload,
    getAllImages,
    deleteImage,
    getSingleImage
};
