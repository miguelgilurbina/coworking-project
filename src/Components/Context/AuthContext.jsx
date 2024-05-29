// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //TODO: codigo temporal para probar el login
  const login = (email) => {
    const mockUser = { name: "Karina López", email };
    setUser(mockUser);
  };

  // const login = (userData) => {
  //   setUser(userData);
  // };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
