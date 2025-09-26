import Farm from "../Model/models/farmModel.js";

// Get all farms
export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({});
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch farms" });
  }
};

// Create a new farm
export const createFarm = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image URL are required" });
    }

    const newFarm = new Farm({ name, image });
    await newFarm.save();

    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ message: "Failed to create farm" });
  }
};

// Delete a farm
export const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    await Farm.findByIdAndDelete(req.params.id);  // 🔥 fixed line
    res.json({ message: "Farm deleted" });
  } catch (error) {
    console.error(error); // Also log to see what error exactly
    res.status(500).json({ message: "Failed to delete farm" });
  }
};

