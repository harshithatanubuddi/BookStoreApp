import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  adminStats,
  getAllUsers
} from "../controller/admin_controller.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", protect, isAdmin, adminStats);

// Get all users
router.get("/users", protect, isAdmin, getAllUsers);

export default router;
