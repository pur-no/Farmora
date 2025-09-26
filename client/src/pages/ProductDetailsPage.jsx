// client/src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (data.success) {
          setProduct(data.data);
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run the effect if the ID changes

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  return (
    <div className="product-details-container">
      <Link to="/products" className="back-link">
        &larr; Back to Products
      </Link>
      <div className="product-details-content">
        {/* You can add an image gallery here later */}
        <div className="product-info-main">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-seller">Sold by: {product.seller}</p>
          <hr />
          <p className="product-price-details">${product.price.toFixed(2)}</p>
          <div className="product-stock-status">
            Status: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
          <hr />
          <p className="product-description-full">{product.description}</p>
          <button
            className="add-to-cart-btn"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;