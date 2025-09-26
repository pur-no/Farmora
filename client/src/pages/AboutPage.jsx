import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="hero-section">
        <img src="/images/farm-theme.jpg" alt="Farm Theme" className="hero-image" />
        <h1>Welcome to Farm Management System</h1>
        <p className="greetings">
          Greetings! Our goal is to empower farmers and buyers with a digital platform to efficiently manage, buy, and sell farm products.
        </p>
      </div>

      <div className="content-section">
        <div className="feature-box">
          <h2>Buy & Sell Farm Products</h2>
          <p>
            List your fresh farm goods and reach interested buyers across the region. We support sustainable, local agriculture.
          </p>
        </div>

        <div className="feature-box">
          <h2>Manage Your Farm</h2>
          <p>
            Track important activities like watering, fertilizing, harvesting, and more. Get reminders and maintain productivity.
          </p>
        </div>

        <div className="feature-box">
          <h2>Real-time Insights</h2>
          <p>
            Monitor farm performance, delivery tracking, and marketplace trends all in one place.
          </p>
        </div>
      </div>

      <footer className="footer">
        <h3>Contact Us</h3>
        <p>📞 Phone: +880-123-456-789</p>
        <p>📧 Email: support@farmmanagement.com</p>
        <p>📍 Location: Dhaka, Bangladesh</p>
      </footer>
    </div>
  );
};

export default AboutUs;
