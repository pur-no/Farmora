import React from "react";
import PropTypes from "prop-types";

const ProductList = ({ products, onEdit, onDelete, loading, error }) => {
  return (
    <div className="mt-6">
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      {loading ? (
        <p aria-live="polite">Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse" aria-label="Product list">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Product Name</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Stock</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">₹{product.price}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onEdit(product)}
                    className="mr-2 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Edit ${product.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete ${product.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default ProductList;