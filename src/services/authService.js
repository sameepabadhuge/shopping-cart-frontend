// src/services/authService.js

import axios from "../utils/axiosInstance";

/* =========================
   BASE ROUTE
========================= */
const API =
  "/auth";

/* =========================
   USER REGISTER
========================= */
export const registerUser =
  async (formData) => {
    const res =
      await axios.post(
        `${API}/register`,
        formData
      );

    return res.data;
  };

/* =========================
   USER LOGIN
========================= */
export const loginUser =
  async (formData) => {
    const res =
      await axios.post(
        `${API}/login`,
        formData
      );

    return res.data;
  };

/* =========================
   ADMIN LOGIN
========================= */
export const loginAdmin =
  async (formData) => {
    const res =
      await axios.post(
        `${API}/admin-login`,
        formData
      );

    return res.data;
  };

/* =========================
   GET PROFILE
========================= */
export const getProfile =
  async () => {
    const res =
      await axios.get(
        `${API}/profile`
      );

    return res.data;
  };

/* =========================
   LOGOUT
========================= */
export const logoutUser =
  () => {
    localStorage.removeItem(
      "user"
    );
  };