// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';
import Spinner from '../components/Spinner';

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
        setError('Failed to fetch your products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
        if (res.data.success) {
          setProducts(products.filter((p) => p._id !== id));
          alert('Product deleted successfully!');
        }
      } catch (err) {
        alert('Failed to delete product.');
        console.error(err);
      }
    }
  };


  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Products Dashboard</h1>
        <Link to="/products/new" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      {products.length > 0 ? (
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="actions-cell">
                  <Link to={`/products/edit/${product._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="btn btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not added any products yet. <Link to="/products/new">Add one now!</Link></p>
      )}
    </div>
  );
};

export default DashboardPage;