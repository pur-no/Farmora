import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts, createProduct } from "../api/productAPI";
import { debounce } from "lodash";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadProducts();
  }, [search, sortKey, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, total } = await fetchProducts({
        search,
        sort: sortKey,
        page: currentPage,
        limit: itemsPerPage,
      });
      setProducts(data);
      setTotalCount(total);
    } catch (err) {
      const message = "Failed to load products.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      await createProduct(data);
      toast.success("Product created successfully!");
      loadProducts();
    } catch (err) {
      const message = err.message || "Failed to create product.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, 300);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="main-content">
        <h1>Product Management</h1>
        {error && (
          <div className="error-message" role="alert">
            <span>{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss error">
              &times;
            </button>
          </div>
        )}

        {/* Add Product Form */}
        <div className="form-container">
          <h2>Add Product</h2>
          <ProductForm
            onSubmit={handleCreate}
            submitText="Add Product"
            loading={loading}
          />
        </div>

        {/* Search and Sort Controls */}
        <div className="search-sort-container">
          <SearchBar onSearch={handleSearch} />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort products"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
        </div>

        {/* Product List and Pagination */}
        {loading ? (
          <div className="loading" aria-live="polite">
            Loading products...
          </div>
        ) : (
          <>
            <ProductTable products={products} onRefresh={loadProducts} />
            <Pagination
              total={totalCount}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  // No props currently, but added for future extensibility
};

export default ProductPage;