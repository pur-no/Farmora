// client/src/pages/WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { getWeatherIcon, formatDate, formatDay } from '../utils/weatherUtils';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchWeatherForCoords = async (lat, lon) => {
      try {
        const { data } = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
        if (data.success) {
          setWeatherData(data.data);
        }
      } catch (err) {
        toast.error('Could not fetch weather data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherForCoords(position.coords.latitude, position.coords.longitude);
          },
          () => {
            setLocationError('Location access denied. Please allow location access in your browser settings to see the weather.');
            setLoading(false);
            toast.error('Location access was denied.');
          }
        );
      } else {
        setLocationError('Geolocation is not supported by your browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-128px)] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Weather Forecast
        </h1>

        {loading && <Spinner />}

        {!loading && locationError && (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-600">Could not get your location</h2>
            <p className="text-gray-600 mt-2">{locationError}</p>
          </div>
        )}

        {!loading && weatherData && (
          <div className="space-y-8">
            {/* Current Weather */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-gray-700">{formatDate(weatherData.current.dt)}</h2>
              <div className="flex items-center justify-center mt-4">
                <span className="text-7xl">{getWeatherIcon(weatherData.current.weather[0].icon)}</span>
                <div className="ml-4 text-left">
                  <p className="text-5xl font-bold">{Math.round(weatherData.current.temp)}°C</p>
                  <p className="capitalize text-gray-500">{weatherData.current.weather[0].description}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-600">
                Feels like {Math.round(weatherData.current.feels_like)}°C
              </p>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-700">7-Day Forecast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
                {weatherData.daily.slice(0, 7).map((day, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">{formatDay(day.dt)}</p>
                    <p className="text-3xl my-2">{getWeatherIcon(day.weather[0].icon)}</p>
                    <p className="font-bold">{Math.round(day.temp.max)}°</p>
                    <p className="text-gray-500">{Math.round(day.temp.min)}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;