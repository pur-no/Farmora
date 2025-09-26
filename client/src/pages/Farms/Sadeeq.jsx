import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Sadeeq.css";

const Sadeeq = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sadeeqagro");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching Sadeeq Agro products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <div className="sadeeq-agro-page">
      <div className="nav-bar">
        <img src="/images/Sadeeq.jpg" alt="Sadeeq Agro Logo" />
        <h2>Sadeeq Agro</h2>
        <div className="nav-icons">
          <img
            src="/images/home.png"
            onClick={() => navigate("/home")}
            className="nav-icon"
            alt="Home"
          />
          <img
            src="/images/cart.png"
            onClick={() => navigate("/cart", { state: { cartItems: cart } })}
            className="nav-icon"
            alt="Cart"
          />
          <img
            src="/images/notification.png"
            onClick={() => navigate("/notifications")}
            className="nav-icon"
            alt="Notifications"
          />
          <img
            src="/images/profile.png"
            onClick={() => navigate("/profile")}
            className="nav-icon"
            alt="Profile"
          />
          <button
            className="review-button"
            onClick={() => navigate("/review")}
          >
            Product Review
          </button>
        </div>
      </div>

      <div className="welcomeMessage">
        <h1 className="welcomeText">Welcome to Sadeeq Agro</h1>
      </div>

      <div className="farmProducts">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div key={index} className="farmProduct">
              <img src={item.image} alt={item.name} className="farmProductImage" />
              <h3 className="farmProductName">{item.name}</h3>
              <p className="farmProductPrice">Price: {item.price} Tk</p>
              <p className="farmProductUnit">Unit: {item.unit}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                Add <img src="/images/cart.png" className="cart-icon" alt="Cart" />
              </button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Sadeeq;
