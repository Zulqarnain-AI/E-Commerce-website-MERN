/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    try {
      if (storedUser?.refreshToken) {
        await api.post("/api/users/logout", {
          refreshToken: storedUser.refreshToken,
        });
      }
    } catch {
      // Clear local state even if the logout request fails.
    }

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
