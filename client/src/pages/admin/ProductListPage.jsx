// client/src/pages/admin/ProductListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get('/api/admin/products');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        toast.error('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      const deletePromise = axios.delete(`/api/admin/products/${productId}`);
      toast.promise(deletePromise, {
        loading: 'Deleting product...',
        success: () => {
          setProducts(products.filter((p) => p._id !== productId));
          return <b>Product deleted successfully!</b>;
        },
        error: (err) => <b>{err.response?.data?.message || 'Could not delete product.'}</b>,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-128px)] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Manage All Products
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Created By</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Link to={`/products/${product._id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.user ? product.user.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;