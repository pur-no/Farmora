import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/FarmProfile.css";

const FarmProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        setError("User not logged in.");
        return navigate("/login");
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userInfo.id}`);
        setUser(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Something went wrong.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const goToHome = () => navigate("/home");
  const goToCart = () => navigate("/cart");
  const goToNotifications = () => navigate("/notifications");

  if (error) return <div>{error}</div>;

  return (
    <div className="farm-profile-page">
      <div className="nav-bar">
        <h2>Farmora</h2>
        <img src="/images/home.png" alt="Home" className="nav-icon" onClick={goToHome} />
        <img src="/images/cart.png" alt="Cart" className="nav-icon" onClick={goToCart} />
        <img src="/images/notification.png" alt="Notification" className="nav-icon" onClick={goToNotifications} />
        <img src="/images/logout.png" alt="Logout" className="nav-icon" onClick={handleLogout} />
      </div>

      {user && (
        <div className="profile-card">
          <img src="/images/profile.png" alt="Profile" className="profile-avatar" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-detail">Email: {user.email}</p>
          <p className="profile-detail">Location: {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default FarmProfile;
