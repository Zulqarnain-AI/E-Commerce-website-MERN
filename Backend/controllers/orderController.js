import mongoose from "mongoose";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 🔥 SANITIZE & CONVERT ObjectId
    const sanitizedOrderItems = orderItems.map((item) => ({
      product: new mongoose.Types.ObjectId(item._id),
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));

    const order = new Order({
      orderItems: sanitizedOrderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      orderId: createdOrder._id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
