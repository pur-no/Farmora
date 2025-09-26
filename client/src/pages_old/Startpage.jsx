import React, { useState, useEffect } from "react";
import "../styles/StartPage.css"; 

const StartPage = () => {
  const [message, setMessage] = useState("Loading...");


  useEffect(() => {
    fetch("http://localhost:5000/api/welcome")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="start-page" style={{ backgroundImage: "url('/images/bg2.jpg')" }}>
      <div className="overlay">
        <div className="nav-bar">
          <h2 className="system-name">Farmora</h2>
          <div className="nav-buttons">
            <button onClick={() => (window.location.href = "/login")}>Login</button>
            <button onClick={() => (window.location.href = "/signup")}>Sign Up</button>
            <button onClick={() => (window.location.href = "/about")}>About Us</button>
          </div>
        </div>
        <h1 className="app-name">Welcome to Farmora</h1>
        <p className="welcome-message">{message}</p>
      </div>
    </div>
  );
};

export default StartPage;
