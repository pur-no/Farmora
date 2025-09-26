import React, { useState } from "react";
import PropTypes from "prop-types";
import { createProduct } from "../api/productAPI";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createProduct(data);
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      const message = err.message || "Failed to create product.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      <ProductForm
        onSubmit={handleCreate}
        submitText="Create"
        loading={loading}
      />
    </div>
  );
};

ProductCreate.propTypes = {
  // No props currently, but added for future extensibility
};

export default ProductCreate;