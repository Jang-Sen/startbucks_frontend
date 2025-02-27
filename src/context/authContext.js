import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    setUser({ token: accessToken });
  }, []);

  const login = (token) => {
    Cookies.set("accessToken", token, { expires: 1, secure: true });
    setUser({ token });
  };

  const logout = () => {};
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth Error");
  }

  return context;
};
