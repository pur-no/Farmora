// models/bracSeedModel.js
import mongoose from "mongoose";

const bracSeedSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true, // e.g., "kg", "pcs"
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BracSeed = mongoose.model("BracSeed", bracSeedSchema);

export default BracSeed;
