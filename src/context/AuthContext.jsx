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
     SAFE LOAD SAVED USER
  ========================= */
  let savedUser =
    null;

  try {
    savedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );
  } catch {
    savedUser =
      null;
  }

  const [user, setUser] =
    useState(
      savedUser || null
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

    /* Backend:
       {
         user:{},
         token:""
       }
    */
    if (
      data?.user &&
      data.user._id
    ) {
      userData = {
        ...data.user,
        token:
          data.token,
      };
    }

    /* Direct User Object */
    else if (
      data?._id
    ) {
      userData =
        data;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    setUser(
      userData
    );
  };

  /* =========================
     UPDATE USER
  ========================= */
  const updateUser =
    (newData) => {
      const updatedUser =
        {
          ...(user ||
            {}),
          ...newData,
        };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      setUser(
        updatedUser
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
     AUTO SYNC TABS
  ========================= */
  useEffect(() => {
    const syncUser =
      () => {
        try {
          const saved =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          setUser(
            saved
          );
        } catch {
          setUser(
            null
          );
        }
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