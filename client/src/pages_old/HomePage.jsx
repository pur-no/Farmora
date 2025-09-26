import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBot from "./ChatBot"; 
import "../styles/HomePage.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/farms");
        setFarms(res.data);
        setFilteredFarms(res.data.slice(0, 4));
      } catch (err) {
        setError("Failed to fetch farms.");
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredFarms(farms.slice(0, 4));
    } else {
      const results = farms.filter((farm) =>
        farm.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFarms(results);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const goToFarm = (farmName) => {
    const farmRoute = farmName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${farmRoute}`);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <div className="nav-bar">
        <h2>Farmora</h2>
        <div className="nav-icons">
          <img src="/images/cart.png" alt="Cart" onClick={() => navigate("/cart")} className="nav-icon" />
          <img src="/images/weather.png" alt="Weather" onClick={() => navigate("/weather")} className="nav-icon weather-icon pulsing-weather" />
          <img src="/images/notification.png" alt="Notification" onClick={() => navigate("/notifications")} className="nav-icon" />
          <img src="/images/profile.png" alt="Profile" onClick={() => navigate("/farm-profile")} className="nav-icon" />
          <img src="/images/logout.png" alt="Logout" onClick={handleLogout} className="nav-icon" />
        </div>
      </div>

      {/* Search */}
      <div className="search-bar-section">
        <input
          type="text"
          placeholder="Search farms or agros..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Farms List */}
      <div className="farm-list">
        <h2>Available Farms & Agros</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredFarms.length === 0 ? (
          <p>No farms found</p>
        ) : (
          <div className="farm-items">
            {filteredFarms.map((farm) => (
              <div key={farm._id} className="farm-card" onClick={() => goToFarm(farm.name)}>
                <img src={farm.image} alt={farm.name} className="farm-image" />
                <p>{farm.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Chatbot floating widget */}
      <ChatBot />
    </div>
  );
};

export default HomePage;
