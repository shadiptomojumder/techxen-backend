import express from "express";
import { ProjectController } from "./projects.controller.js";

const router = express.Router();

// Route to create a new project
router.post("/", ProjectController.createProject);

// Route to get all projects
router.get("/", ProjectController.getAllProjects);

// Route to get a single project by ID
router.get("/:id", ProjectController.getProjectById);

// Route to update a project by ID
router.patch("/:id", ProjectController.updateProject);

// Route to delete a project by ID
router.delete("/:id", ProjectController.deleteProject);

const ProjectRoutes = router;

export { ProjectRoutes };