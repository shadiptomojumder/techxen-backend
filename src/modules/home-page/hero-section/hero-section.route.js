import express from "express";
import { HeroSectionController } from "./hero-section.controller.js";

// Create a new Express router
const router = express.Router();

// Route to create or update the Hero Section
router.post("/", HeroSectionController.upsertHeroSection);

// Route to get the Hero Section
router.get("/", HeroSectionController.getHeroSection);

// Route to delete the Hero Section
router.delete("/", HeroSectionController.deleteHeroSection);

const HeroSectionRoutes = router;

export { HeroSectionRoutes };
