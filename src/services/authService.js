import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

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
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    const token =
      user?.token;

    const res =
      await axios.get(
        `${API}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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