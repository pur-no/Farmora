// server/routes/adminRoutes.js
import express from 'express';
import { getUsers, deleteUser, getAllProducts, deleteProduct } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect and admin middleware to all routes in this file
router.use(protect, admin);

// Routes for managing users
router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);

// Routes for managing products
router.route('/products').get(getAllProducts);
router.route('/products/:id').delete(deleteProduct);

export default router;