// client/src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg">Product not found.</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/products" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8 md:grid md:grid-cols-2 md:gap-12">
          {/* Image Column */}
          <div className="flex justify-center items-center bg-gray-200 rounded-lg">
             <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
             />
          </div>

          {/* Details Column */}
          <div className="mt-8 md:mt-0">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-2">Sold by: {product.seller}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                <div className={`mt-2 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                </div>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
            
            <div className="mt-8">
              <button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;