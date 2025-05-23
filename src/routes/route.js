import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { GalleryRoutes } from "../modules/gallery/gallery.route.js";
import { BlogRoutes } from "../modules/blogs/blogs.route.js";
import { HeroSectionRoutes } from "../modules/home-page/hero-section/hero-section.route.js";
import { ServiceSectionRoutes } from "../modules/home-page/services-section/services-section.route.js";
import { TeamsRoutes } from "../modules/teams/teams.route.js";
import { ProjectRoutes } from "../modules/projects/projects.route.js";

const router = express.Router();

// Define all API routes
const moduleRoutes = [
    // {
    //     path: "/users",
    //     route: UserRoutes,
    // },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/gallery",
        route: GalleryRoutes,
    },
    {
        path: "/blogs",
        route: BlogRoutes,
    },
    {
        path: "/hero-section",
        route: HeroSectionRoutes,
    },
    {
        path: "/services",
        route: ServiceSectionRoutes,
    },
    {
        path: "/teams",
        route: TeamsRoutes,
    },
    {
        path: "/projects",
        route: ProjectRoutes,
    },
];

// Register each route and log it using console
moduleRoutes.forEach((route) => {
    try {
        router.use(route.path, route.route);
        console.log(`Route registered: ${route.path}`);
    } catch (error) {
        console.error(`Error registering route ${route.path}:`, error);
    }
});

// Handle 404 errors if no routes match
router.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `No API route found for ${req.originalUrl}`,
    });
    console.warn(`404 Not Found: ${req.originalUrl}`);
});

// Middleware for logging requests
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(
            `Request: ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
        );
    });
    next();
});

export default router;
