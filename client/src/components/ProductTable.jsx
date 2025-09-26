import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/productAPI";
import { toast } from "react-toastify";

const ProductTable = ({ products, onRefresh }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product._id}`);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setLoading(true);
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        onRefresh();
      } catch (err) {
        toast.error(err.message || "Failed to delete product.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="loading" aria-live="polite">
          Deleting...
        </div>
      )}
      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className={`card ${product.quantity < 5 ? "highlight" : ""}`}
            role="region"
            aria-label={`Product ${product.name}`}
          >
            <div>
              <h3>{product.name}</h3>
              <p>Category: {product.category || "N/A"}</p>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="card-actions">
              <button
                onClick={() => handleEdit(product)}
                className="edit"
                aria-label={`Edit ${product.name}`}
                disabled={loading}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id, product.name)}
                className="delete"
                aria-label={`Delete ${product.name}`}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default ProductTable;