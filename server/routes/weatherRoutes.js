// server/routes/weatherRoutes.js
import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getWeather);

export default router;