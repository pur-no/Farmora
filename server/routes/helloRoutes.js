// server/routes/helloRoutes.js
import express from 'express';
import { sayHello } from '../controllers/helloController.js';

const router = express.Router();

// @route   GET /api/hello
// @desc    A simple hello world route
// @access  Public
router.get('/', sayHello);

export default router;