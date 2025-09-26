import express from "express";
import SadeeqAgro from "../models/sadeeqAgroModel.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await SadeeqAgro.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Sadeeq Agro products." });
  }
});

export default router;
