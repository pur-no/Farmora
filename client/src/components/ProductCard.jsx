// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* You can add product images later */}
      {/* <img src={product.imageUrl} alt={product.name} className="product-image" /> */}
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-seller">Sold by: {product.seller}</div>
      </div>
    </div>
  );
};

export default ProductCard;