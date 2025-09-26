import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/products",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);

export const fetchProducts = async (params = {}) => {
  const res = await api.get("", { params });
  return {
    data: res.data,
    total: res.headers["x-total-count"] || res.data.length, // Adjust based on backend
  };
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post("", product);
  return res.data;
};

export const updateProduct = async (id, updates) => {
  const res = await api.put(`/${id}`, updates);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};