// src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  /* =========================
     LOAD USER FROM STORAGE
  ========================= */
  const getSavedUser =
    () => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "user"
          )
        );
      } catch {
        return null;
      }
    };

  const [user, setUser] =
    useState(
      getSavedUser()
    );

  const [loading,
    setLoading] =
    useState(false);

  /* =========================
     LOGIN
  ========================= */
  const login = (data) => {
    let userData =
      null;

    /* Backend returns:
       {
         user:{},
         token:""
       }
    */
    if (
      data?.user &&
      data?.token
    ) {
      userData = {
        ...data.user,
        token:
          data.token,
      };
    }

    /* Direct object */
    else if (
      data?._id
    ) {
      userData =
        data;
    }

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(
          userData
        )
      );

      setUser(
        userData
      );
    }
  };

  /* =========================
     UPDATE USER
  ========================= */
  const updateUser =
    (newData) => {
      const updated =
        {
          ...(user ||
            {}),
          ...newData,
        };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updated
        )
      );

      setUser(
        updated
      );
    };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "pendingCart"
    );

    localStorage.removeItem(
      "redirectAfterLogin"
    );

    localStorage.removeItem(
      "passcodeUserEmail"
    );

    setUser(null);
  };

  /* =========================
     SYNC MULTIPLE TABS
  ========================= */
  useEffect(() => {
    const syncUser =
      () => {
        setUser(
          getSavedUser()
        );
      };

    window.addEventListener(
      "storage",
      syncUser
    );

    return () =>
      window.removeEventListener(
        "storage",
        syncUser
      );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () =>
    useContext(
      AuthContext
    );