import express from 'express';
import axios from 'axios';

const router = express.Router();

const BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = process.env.WEATHER_API_KEY;

// 🌦️ Get current + forecast weather
router.get('/', async (req, res) => {
  const city = req.query.city || 'London';
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 3,
        aqi: 'no',
        alerts: 'no',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// 🔍 Autocomplete city search
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search locations' });
  }
});

export default router;
