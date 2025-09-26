import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchProductById, updateProduct } from "../api/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => {
        const message = "Failed to load product.";
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      await updateProduct(id, data);
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      const message = err.message || "Failed to update product.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-4" aria-live="polite">Loading...</p>;
  if (error) return <p className="p-4 text-red-500" role="alert">{error}</p>;
  if (!product) return <p className="p-4" role="alert">Product not found.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitText="Update"
        loading={loading}
      />
    </div>
  );
};

ProductEdit.propTypes = {
  // No props currently, but added for future extensibility
};

export default ProductEdit;