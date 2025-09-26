import express from 'express';
import AdminOnlineList from '../models/AdminOrderList.js';

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    console.log("Received order data:", req.body); 
    const newOrder = new AdminOnlineList(req.body); 
    await newOrder.save(); 
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Error saving order" });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await AdminOnlineList.find(); 
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

export default router;
