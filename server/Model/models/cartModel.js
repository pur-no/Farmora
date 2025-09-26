import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming a User model exists
  },
  items: [
    {
      farmId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farm", // Assuming a Farm model exists
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
