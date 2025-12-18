import express from "express";
import { checkout, getMyOrders1 } from "../controller/order_controller.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getAllOrders,
  cancelOrder,
  updateOrderStatus
} from "../controller/order_controller.js";

const router = express.Router();

router.post("/checkout", protect, checkout);
router.get("/my-orders", protect, getMyOrders1);
router.put(
  "/:id/status",
  protect,
  isAdmin,
  updateOrderStatus
);

/* ADMIN */
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/cancel", protect, isAdmin, cancelOrder);

export default router;
