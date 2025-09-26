// client/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Our Products
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
                ) : (
                <p className="text-center col-span-full">No products found.</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default ProductsPage;