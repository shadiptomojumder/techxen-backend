import express from "express";
import { GalleryController } from "./gallery.controller.js";
import {upload} from "../../middlewares/multer.middleware.js";

// Create a new Express router
const router = express.Router();

// Define the route for uploading images to the gallery
router.post("/upload",upload.array("images",10) ,GalleryController.upload);

// Define the route for getting all images from the gallery
router.get("/all", GalleryController.getAllImages);

// Define the route for deleting images from the gallery
router.delete("/delete/:publicId", GalleryController.deleteImage);

// Define the route for get single image from the gallery by publicId
router.get("/:publicId", GalleryController.getSingleImage);

const GalleryRoutes = router;

export { GalleryRoutes };
