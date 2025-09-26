// server/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  // req.file.path contains the secure URL from Cloudinary
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    data: req.file.path,
  });
});

export default router;