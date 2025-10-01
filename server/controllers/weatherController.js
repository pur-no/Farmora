// server/controllers/weatherController.js
import axios from 'axios';
import 'dotenv/config';

/**
 * @desc    Fetch weather data from OpenWeatherMap API
 * @route   GET /api/weather
 * @access  Private
 */
export const getWeather = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ success: false, message: 'Latitude and Longitude are required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, message: 'Weather API key is not configured' });
  }

  // We use the "One Call" API to get current, hourly, and daily forecasts in a single request
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to fetch weather data',
    });
  }
};