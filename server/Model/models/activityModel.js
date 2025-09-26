import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["task", "inventory", "user", "other"], // Example types
    required: true,
  },
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;