import express from "express";
import {
     createOrder,
     getOrderById,
     getAllOrders,
     markOrderPaid,
     markOrderDelivered
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id/pay", markOrderPaid);
router.put("/:id/deliver", markOrderDelivered);
export default router;
