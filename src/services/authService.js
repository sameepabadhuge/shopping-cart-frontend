import axios from "axios";

const API = "http://localhost:5000/api/auth";

// User Register
export const registerUser = async (userData) => {
  const res = await axios.post(`${API}/register`, userData);
  return res.data;
};

// User Login
export const loginUser = async (userData) => {
  const res = await axios.post(`${API}/login`, userData);
  return res.data;
};

// Admin Login
export const loginAdmin = async (userData) => {
  const res = await axios.post(`${API}/admin-login`, userData);
  return res.data;
};