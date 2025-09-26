import express from "express";
import BracSeed from "../models/BracSeed.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await BracSeed.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch BracSeed products." });
  }
});

export default router;
