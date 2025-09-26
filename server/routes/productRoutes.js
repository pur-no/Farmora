// server/routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getMyProducts, // Import the new controller
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to get all products
router.route('/').get(getProducts);

// Private route to create a new product
router.route('/').post(protect, newProduct);

// Private route to get the logged-in user's products
router.route('/myproducts').get(protect, getMyProducts);

// Public route to get a single product
router.route('/:id').get(getSingleProduct);

// Private routes to update and delete a product
router
  .route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;