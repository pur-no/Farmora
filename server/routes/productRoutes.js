// server/routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Define routes
router.route('/').get(getProducts).post(newProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;