// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/products/${product._id}`}>
        {/* Use the actual product image */}
        <img
          className="h-48 w-full object-cover rounded-t-lg"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="px-5 pb-5 pt-3">
        <Link to={`/products/${product._id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 truncate hover:underline">
            {product.name}
          </h5>
        </Link>
        <div className="mt-2.5 mb-5">
            <p className="text-sm text-gray-600 truncate">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <Link
            to={`/products/${product._id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            View Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;