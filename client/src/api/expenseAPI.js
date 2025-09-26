import axios from "axios";

const BASE_URL = "http://localhost:5000/api/expenses";

export const getExpenses = async (filter = {}) => {
  const res = await axios.get(BASE_URL, { params: filter });
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

export const createExpense = async (expense) => {
  const res = await axios.post(BASE_URL, expense);
  return res.data;
};

export const updateExpense = async (id, updated) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updated);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};