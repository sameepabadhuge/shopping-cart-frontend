import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const savedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [user, setUser] =
    useState(
      savedUser || null
    );

  const login = (data) => {
    let userData = null;

    if (
      data.user &&
      data.user._id
    ) {
      userData = {
        ...data.user,
        token:
          data.token,
      };
    } else if (
      data._id
    ) {
      userData = data;
    } else {
      userData = null;
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

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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