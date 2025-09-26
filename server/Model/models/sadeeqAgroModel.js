import mongoose from "mongoose";

const sadeeqAgroSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const SadeeqAgro = mongoose.model("SadeeqAgro", sadeeqAgroSchema);
export default SadeeqAgro;
