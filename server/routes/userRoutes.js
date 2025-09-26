// server/routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

export default router;