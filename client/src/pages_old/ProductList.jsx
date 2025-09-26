import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchProducts, deleteProduct } from "../api/productAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      const message = "Failed to load products.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        loadProducts();
      } catch (err) {
        const message = "Failed to delete product.";
        setError(message);
        toast.error(message);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Products</h2>
        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          aria-label="Add new product"
        >
          + Add Product
        </button>
      </div>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      {loading ? (
        <p aria-live="polite">Loading...</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.quantity}</td>
                <td className="p-2 border">{p.category || "N/A"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                    className="text-blue-600 mr-2 hover:underline"
                    aria-label={`Edit ${p.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                    aria-label={`Delete ${p.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

ProductList.propTypes = {
  // No props currently, but added for future extensibility
};

export default ProductList;