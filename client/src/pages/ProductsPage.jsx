// client/src/pages/ProductsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination'; // Import the Pagination component
import { useSearchParams } from 'react-router-dom';

const categories = [
  'All', 'Food', 'Electronics', 'Cameras', 'Laptops', 'Accessories',
  'Headphones', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports',
  'Outdoor', 'Home'
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || 'All';
  const pageNumber = searchParams.get('pageNumber') || 1;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (category && category !== 'All') params.append('category', category);
      params.append('pageNumber', pageNumber);

      const { data } = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.data);
        setPage(data.page);
        setPages(data.pages);
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [keyword, category, pageNumber]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ keyword, category, pageNumber: 1 });
  };
  
  const handleCategoryClick = (cat) => {
    setSearchParams({ keyword, category: cat, pageNumber: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ keyword, category, pageNumber: newPage });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Our Products
        </h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="search"
              defaultValue={keyword}
              onChange={(e) => setSearchParams(prev => {
                prev.set('keyword', e.target.value);
                return prev;
              }, { replace: true })}
              placeholder="Search for products..."
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                category === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? <Spinner /> : error ? (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="text-center col-span-full py-16">
                  <h3 className="text-xl font-semibold text-gray-700">No Products Found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
            <div className="mt-12 flex justify-center">
              <Pagination pages={pages} page={page} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;