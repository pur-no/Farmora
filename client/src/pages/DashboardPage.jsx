// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { toast } from 'react-hot-toast'; // Import toast

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/myproducts');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        const message = 'Failed to fetch your products.';
        setError(message);
        toast.error(message); // Error toast
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    // We can use toast.promise for a nice loading state
    const deletePromise = axios.delete(`http://localhost:5000/api/products/${id}`);

    toast.promise(deletePromise, {
       loading: 'Deleting product...',
       success: () => {
         setProducts(products.filter((p) => p._id !== id));
         return <b>Product deleted!</b>;
       },
       error: <b>Could not delete product.</b>,
     });
  };


  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-128px)] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            My Products Dashboard
          </h1>
          <Link
            to="/products/new"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300"
          >
            + Add New Product
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          {products.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Stock</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.name}
                    </th>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-8 text-gray-500">
              <p>You haven't added any products yet.</p>
              <Link to="/products/new" className="mt-2 inline-block text-blue-600 hover:underline">
                Add one now!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;