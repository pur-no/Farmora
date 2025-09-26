import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "../styles/Payment.css";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const navigate = useNavigate();

  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      products: cart,
      paymentMethod: selectedPaymentMethod,
      orderTime: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        localStorage.removeItem("cartItems");
        setCart([]);

        
        const adminResponse = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (adminResponse.ok) {
          alert("Order placed successfully and added to Admin's Order List!");
          navigate("/track");
        } else {
          alert("Failed to add order to Admin's Order List.");
        }
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order!");
    }
  };

  return (
    <div className="payment-page">
      <div className="nav-bar">
        <img src="/images/Farmora.png" alt="Farmora Logo" />
        <h2>Payment Gateway</h2>
        <div className="nav-icons">
          <img
            src="/images/home.png"
            alt="Home"
            className="nav-icon"
            onClick={() => navigate("/home")}
          />
          <img
            src="/images/cart.png"
            alt="Cart"
            className="nav-icon"
            onClick={() => navigate("/cart")}
          />
          <img
            src="/images/notification.png"
            alt="Notifications"
            className="nav-icon"
            onClick={() => navigate("/notifications")}
          />
          <img
            src="/images/profile.png"
            alt="Profile"
            className="nav-icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>

      <div className="payment-content">
        <h1>Select Payment Method</h1>
        <div className="payment-options">
          <div
            className={`payment-option ${selectedPaymentMethod === "cash" ? "selected" : ""}`}
            onClick={() => handlePaymentMethod("cash")}
          >
            <img src="/images/cash-on-delivery.jpg" alt="Cash on Delivery" className="payment-icon-only" />
          </div>
          <div
            className={`payment-option ${selectedPaymentMethod === "bkash" ? "selected" : ""}`}
            onClick={() => handlePaymentMethod("bkash")}
          >
            <img src="/images/Bkash.webp" alt="bKash" className="payment-icon-only" />
          </div>
        </div>

        {selectedPaymentMethod === "bkash" && (
          <div className="bkash-info">
            <p className="bkash-number">bKash Number: 017XXXXXXXX</p>
            <QRCode value="017XXXXXXXX" size={150} />
          </div>
        )}

        <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
