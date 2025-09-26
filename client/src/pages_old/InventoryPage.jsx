import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts, updateProduct, deleteProduct } from "../api/productAPI";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import "../styles/InventoryPage.css";


const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityUpdates, setQuantityUpdates] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockStatusFilter, setStockStatusFilter] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const debouncedSetSearchTerm = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { data, total } = await fetchProducts({
          search: searchTerm.trim().toLowerCase(),
          sort: sortKey,
          order: sortOrder,
          page: currentPage,
          limit: itemsPerPage,
          category: categoryFilter || undefined,
          stockStatus: stockStatusFilter || undefined,
        });
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalCount(total);
          setError(null);
        } else {
          throw new Error("Expected an array of products");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Error loading inventory. Please try again.");
        toast.error("Error loading inventory.");
      } finally {
        setLoading(false);
      }
    };
    loadData();

    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [searchTerm, sortKey, sortOrder, currentPage, categoryFilter, stockStatusFilter]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        setProducts(products.filter((p) => p._id !== id));
        setTotalCount((prev) => prev - 1);
      } catch (error) {
        setError("Failed to delete product.");
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleQuantityChange = (id, value) => {
    setQuantityUpdates((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseInt(value, 10),
    }));
  };

  const handleQuantitySubmit = async (id) => {
    const newQuantity = quantityUpdates[id];
    if (newQuantity === undefined || isNaN(newQuantity) || newQuantity < 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }
    try {
      await updateProduct(id, { quantity: newQuantity });
      toast.success("Quantity updated successfully!");
      setProducts(
        products.map((p) =>
          p._id === id ? { ...p, quantity: newQuantity } : p
        )
      );
      setQuantityUpdates((prev) => {
        const newUpdates = { ...prev };
        delete newUpdates[id];
        return newUpdates;
      });
    } catch (error) {
      setError("Failed to update quantity.");
      toast.error("Failed to update quantity.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  // Get unique categories for filter dropdown
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="app-container">
        <Sidebar handleLogout={handleLogout} />
        <div className="main-content">
          <div className="content-container">
            <div className="p-4 flex justify-center items-center">
              <div className="loader"></div>
              <span className="loader-message">Loading inventory...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="content-container">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Inventory Management
          </h2>

          {error && (
            <div className="error-message" role="alert">
              <span>{error}</span>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchProducts({
                    search: searchTerm.trim().toLowerCase(),
                    sort: sortKey,
                    order: sortOrder,
                    page: currentPage,
                    limit: itemsPerPage,
                    category: categoryFilter || undefined,
                    stockStatus: stockStatusFilter || undefined,
                  })
                    .then(({ data, total }) => {
                      if (Array.isArray(data)) {
                        setProducts(data);
                        setTotalCount(total);
                        setError(null);
                      } else {
                        throw new Error("Expected an array of products");
                      }
                    })
                    .catch(() => {
                      setError("Error loading inventory. Please try again.");
                      toast.error("Error loading inventory.");
                    })
                    .finally(() => setLoading(false));
                }}
                aria-label="Retry loading inventory"
              >
                Retry
              </button>
            </div>
          )}

          <div className="filter-sort-container mb-4">
            <SearchBar onSearch={debouncedSetSearchTerm} />
            <div className="filter-controls">
              <div className="filter-group">
                <label className="filter-label">Category:</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filter by category"
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Stock Status:</label>
                <select
                  value={stockStatusFilter}
                  onChange={(e) => {
                    setStockStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filter by stock status"
                  className="filter-select"
                >
                  <option value="">All</option>
                  <option value="low">Low Stock (Under 5)</option>
                  <option value="in">In Stock (5 or More)</option>
                  <option value="out">Out of Stock (0)</option>
                </select>
              </div>
            </div>
            <div className="sort-controls">
              <label className="sort-label">Sort by:</label>
              <select
                value={sortKey}
                onChange={(e) => handleSort(e.target.value)}
                aria-label="Sort products"
                className="sort-select"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
              <button
                onClick={() => handleSort(sortKey)}
                className="sort-order-button"
                aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>

          <table className="w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th
                  className="p-2 border cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Product {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-2 border cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Price {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-2 border cursor-pointer"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity {sortKey === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className={product.quantity < 5 ? "low-stock" : ""}
                >
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">₹{product.price || "N/A"}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="0"
                      value={
                        quantityUpdates[product._id] !== undefined
                          ? quantityUpdates[product._id]
                          : product.quantity
                      }
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                      onBlur={() => handleQuantitySubmit(product._id)}
                      className="quantity-input"
                      aria-label={`Adjust quantity for ${product.name}`}
                    />
                  </td>
                  <td className="p-2 border">{product.category || "N/A"}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${product._id}`)
                      }
                      className="action-button edit-button"
                      aria-label={`Edit ${product.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className="action-button delete-button"
                      aria-label={`Delete ${product.name}`}
                    >
                      Delete
                    </button>
                    {/* Stock history button (uncomment when backend ready) */}
                    {/*
                    <button
                      onClick={() => handleViewStockHistory(product._id)}
                      className="action-button history-button"
                      aria-label={`View stock history for ${product.name}`}
                    >
                      History
                    </button>
                    */}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No inventory data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            total={totalCount}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;