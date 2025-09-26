import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BracSeed.css"; 

const BracSeed = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bracseed");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching Brac Seed products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const goToCart = () => {
    navigate("/cart", { state: { cartItems: cart } });
  };

  return (
    <div className="brac-seed-page">
      <div className="nav-bar">
        <img src="/images/Logos/Bracu.jpg" alt="Brac Seed Logo" />
        <h2>Brac Seed</h2>
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
            onClick={goToCart}
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
          <button
            className="review-button"
            onClick={() => navigate("/review")}
          >
            Product Review
          </button>
        </div>
      </div>

      <div className="welcomeMessage">
        <h1 className="welcomeText">Welcome to Brac Seed</h1>
      </div>

      <div className="farmProducts">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div key={index} className="farmProduct">
              <img
                src={item.image}
                alt={item.name}
                className="farmProductImage"
              />
              <h3 className="farmProductName">{item.name}</h3>
              <p className="farmProductPrice">Price: {item.price} Tk</p>
              <p className="farmProductUnit">Unit: {item.unit}</p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(item)}
              >
                Add <img src="/images/cart.png" alt="Cart Icon" className="cart-icon" />
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

export default BracSeed;
