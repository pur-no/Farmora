// client/src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Food',
    seller: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEditMode = Boolean(productId);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
          if (data.success) {
            const { name, price, description, category, seller, stock } = data.data;
            setFormData({ name, price, description, category, seller, stock });
          }
        } catch (err) {
          setError('Failed to load product data.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`http://localhost:5000/api/products/${productId}`, formData);
      } else {
        res = await axios.post('http://localhost:5000/api/products', formData);
      }

      if (res.data.success) {
        alert(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{isEditMode ? 'Edit Product' : 'Create New Product'}</h2>
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {[
              'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones',
              'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports',
              'Outdoor', 'Home'
            ].map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="seller">Seller</label>
          <input type="text" name="seller" value={formData.seller} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;