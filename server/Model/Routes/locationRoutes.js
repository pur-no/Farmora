import express from "express";
const router = express.Router();

let riderLocation = {
  latitude: 23.8103,
  longitude: 90.4125,
};

router.get("/", (req, res) => {
  res.json(riderLocation);
});

router.post("/update", (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude && longitude) {
    riderLocation = { latitude, longitude };
    res.json({ message: "Location updated", location: riderLocation });
  } else {
    res.status(400).json({ error: "Latitude and longitude required" });
  }
});

export default router;
