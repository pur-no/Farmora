import Review from '../Model/models/Review.js';

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { text, ratings } = req.body;

    if (!text || !Array.isArray(ratings)) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const newReview = new Review({ text, ratings });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  getReviews,
  createReview,
};
