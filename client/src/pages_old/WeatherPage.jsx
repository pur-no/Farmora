import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WeatherPage.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [manualCity, setManualCity] = useState("Dhaka");

  const API_KEY = "260cf2e543b484fd322f2a8d8d902b32"; 

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=260cf2e543b484fd322f2a8d8d902b32`
            );
            setWeatherData(res.data);
            setCity(res.data.name);
          } catch (error) {
            console.error("Failed to fetch weather by location:", error);
            fetchWeatherByCity(manualCity); // fallback
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.warn("Geolocation denied, falling back to manual city.");
          fetchWeatherByCity(manualCity);
        }
      );
    } else {
      fetchWeatherByCity(manualCity);
    }
  }, []);

  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
      setCity(res.data.name);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setManualCity(selectedCity);
    fetchWeatherByCity(selectedCity);
  };

  return (
    <div className="weather-page">
      <h1>Weather in {city || manualCity}</h1>
      <select value={manualCity} onChange={handleCityChange}>
        <option value="Dhaka">Dhaka</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Khulna">Khulna</option>
        <option value="Barisal">Barisal</option>
        <option value="Rangpur">Rangpur</option>
        <option value="Mymensingh">Mymensingh</option>
      </select>

      {loading ? (
        <p>Loading weather...</p>
      ) : weatherData ? (
        <div className="weather-card">
          <h2>{weatherData.weather[0].main}</h2>
          <p>🌡️ Temp: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌬️ Wind: {weatherData.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </div>
      ) : (
        <p>Weather data not available.</p>
      )}
    </div>
  );
};

export default Weather;
