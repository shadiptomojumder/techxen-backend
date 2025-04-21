import express from "express";
import { ServiceSectionController } from "./services-section.controller.js";

const router = express.Router();

// Route to create a new Service Section
router.post("/", ServiceSectionController.createServiceSection);

// Route to get all Service Sections
router.get("/", ServiceSectionController.getAllServiceSections);

// Route to get a single Service Section by ID
router.get("/:id", ServiceSectionController.getServiceSectionById);

// Route to update a Service Section by ID
router.patch("/:id", ServiceSectionController.updateServiceSection);

// Route to delete a Service Section by ID
router.delete("/:id", ServiceSectionController.deleteServiceSection);

const ServiceSectionRoutes = router;

export { ServiceSectionRoutes };