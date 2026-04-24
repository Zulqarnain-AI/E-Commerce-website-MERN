import express from "express";
import {
     createOrder,
     getOrderById,
     getAllOrders,
     markOrderPaid,
     markOrderDelivered,
     getMyOrders
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, markOrderPaid);
router.put("/:id/deliver", protect, admin, markOrderDelivered);
export default router;
