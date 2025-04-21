import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError.js";
import cloudinary, {
    uploadMultipleOnCloudinary,
} from "../../utils/cloudinary.js";

// Function to upload images to the gallery
const upload = async (req) => {
    try {
        // Check if files are present in the request
        if (!req.files || req.files.length === 0) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "At least one image is required to create a product."
            );
        }

        const filePaths = req.files.map((file) => file.path);

        const uploadResults = await uploadMultipleOnCloudinary(
            filePaths,
            "gallery"
        );

        const imageUrls = uploadResults.map((image) => image.url);
        console.log("The imageUrls are:", imageUrls);

        return imageUrls;
    } catch (error) {
        console.log("The upload service Error:", error);

        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
        );
    }
};

// Function to get all images from the gallery
const getAllImages = async () => {
    try {
        // Fetch resources from Cloudinary (limit to 50 images in the 'banners' folder)
        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: "gallery/", // Fetch only images from the 'banners' folder
            resource_type: "image", // Ensure only images are retrieved
            max_results: 50, // Limit number of images
        });

        // Check if there are no resources
        if (!result.resources || result.resources.length === 0) {
            console.log("No banner images found in Cloudinary.");
            return [];
        }

        console.log("The result is:", result);

        // Map the response to return URLs and public IDs
        const bannerImages = result.resources.map((file) => ({
            imageURL: file.secure_url,
            public_id: file.public_id,
        }));

        return bannerImages;
    } catch (error) {
        console.error("Error fetching banner images:", error);
        throw new Error("Failed to fetch images from Cloudinary");
    }
};

// Function to get a single image from the gallery
const getSingleImage = async (req) => {
    try {
        // Extract publicId from request parameters
        const { publicId } = req.params;
        console.log("The publicId is:", publicId);

        if (!publicId) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Public ID is required to fetch an image."
            );
        }

        // Fetch the image details from Cloudinary
        const result = await cloudinary.api.resource(`gallery/${publicId}`);

        if (!result) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Image not found with the provided Public ID."
            );
        }

        // Return the image details
        return {
            imageURL: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            created_at: result.created_at,
        };
    } catch (error) {
        console.error("Error fetching single image:", error);

        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred while fetching the image."
        );
    }
};

// Function to delete an image from the gallery
const deleteImage = async (req) => {
    try {
        // Extract publicId from request body
        const { publicId } = req.params;
        console.log("The publicId is:", publicId);

        if (!publicId) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Public ID is required to delete an image."
            );
        }

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(`gallery/${publicId}`);

        if (result.result !== "ok") {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Image not found or could not be deleted."
            );
        }

        console.log(`Image with public_id ${publicId} deleted successfully.`);
        return { message: "Image deleted successfully." };
    } catch (error) {
        console.error("Error deleting image:", error);

        if (error instanceof ApiError) throw error;
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred while deleting the image."
        );
    }
};

export const GalleryServices = {
    upload,
    getAllImages,
    deleteImage,
    getSingleImage
};
