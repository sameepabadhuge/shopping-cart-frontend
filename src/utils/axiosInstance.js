import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */

const axiosInstance =
  axios.create({
    baseURL:
      import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

/* =========================
   REQUEST INTERCEPTOR
========================= */

axiosInstance.interceptors.request.use(
  (config) => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // token inside user object
    if (user?.token) {
      config.headers.Authorization =
        `Bearer ${user.token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

axiosInstance.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    const currentPath =
      window.location.pathname;

    const isLoginPage =
      currentPath ===
        "/login" ||
      currentPath ===
        "/admin/login";

    // Safe redirect only outside login pages
    if (
      error.response?.status ===
        401 &&
      !isLoginPage
    ) {
      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(
      error
    );
  }
);

export default
  axiosInstance;