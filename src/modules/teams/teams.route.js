import express from "express";
import { TeamController } from "./teams.controller.js";

const router = express.Router();

// Route to create a new team member
router.post("/", TeamController.createTeamMember);

// Route to get all team members
router.get("/", TeamController.getAllTeamMembers);

// Route to get a single team member by ID
router.get("/:id", TeamController.getTeamMemberById);

// Route to update a team member by ID
router.patch("/:id", TeamController.updateTeamMember);

// Route to delete a team member by ID
router.delete("/:id", TeamController.deleteTeamMember);

const TeamsRoutes = router;

export { TeamsRoutes };