import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const AddCart = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const savedCartItems = state?.cartItems || JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, [state]);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // Update localStorage
  };

  const proceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Please add some farms to the cart first.");
      return;
    }
    navigate("/payment", { state: { cartItems, total: calculateTotalPrice() } });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems"); 
    navigate("/login");
  };

  return (
    <div className="add-cart-page">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <h2 className="app-name">Farm Management</h2>
        <div className="nav-icons">
          <img
            src="/images/home.png"
            alt="Home"
            className="nav-icon"
            onClick={() => navigate("/home")}
          />
          <img
            src="/images/profile.png"
            alt="Profile"
            className="nav-icon"
            onClick={() => navigate("/profile")}
          />
          <img
            src="/images/notification.png"
            alt="Notifications"
            className="nav-icon"
            onClick={() => navigate("/notifications")}
          />
          <img
            src="/images/logout.png"
            alt="Logout"
            className="nav-icon"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Cart Details */}
      <div className="add-cart">
        <h1>Your Cart</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Farm</th>
              <th>Price (Tk)</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <p>Total Price: {calculateTotalPrice().toLocaleString()} Tk</p>
        </div>
        <button className="proceed-button" onClick={proceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default AddCart;
