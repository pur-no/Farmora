import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  paymentMethod: {
    type: String,
    enum: ['cash', 'bkash'],
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
});

const AdminOnlineList = mongoose.model('AdminOnlineList', orderSchema);

export default AdminOnlineList;
