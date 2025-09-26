// server/models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      maxLength: [5, 'Product price cannot exceed 5 digits'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category for this product'],
      enum: {
        values: [
          'Electronics',
          'Cameras',
          'Laptops',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Clothes/Shoes',
          'Beauty/Health',
          'Sports',
          'Outdoor',
          'Home',
        ],
        message: 'Please select a valid category',
      },
    },
    seller: {
      type: String,
      required: [true, 'Please provide a seller name'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide product stock'],
      maxLength: [5, 'Product stock cannot exceed 5 digits'],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false, // This can be made required later when you have user auth
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;