import express from "express";
import {
  getBooks,
  getBookById,
  getRelatedBooks,
  createBook,
  updateBook,
  deleteBook,
  topBooksByBranch,
} from "../controller/book_controller.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/stats/top-by-branch", topBooksByBranch);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/:id/related", getRelatedBooks);

/* ADMIN */
router.post("/create", protect, isAdmin, createBook);
router.put("/update/:id", protect, isAdmin, updateBook);
router.delete("/delete/:id", protect, isAdmin, deleteBook);

export default router;
