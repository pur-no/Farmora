import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchProducts, deleteProduct } from "../api/productAPI";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        fetchProductsData();
      } catch (err) {
        const message = "Failed to delete product.";
        setError(message);
        toast.error(message);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      <ProductForm
        initialData={editingProduct}
        onSubmit={() => {
          fetchProductsData();
          setEditingProduct(null);
        }}
        submitText={editingProduct ? "Update" : "Add"}
      />
      {loading ? (
        <p aria-live="polite">Loading...</p>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDelete}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

ManageProducts.propTypes = {
  // No props currently, but added for future extensibility
};

export default ManageProducts;