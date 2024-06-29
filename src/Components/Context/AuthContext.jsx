import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar la validez del token con el backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      // Configura el token para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <div>Loading...</div>; // O cualquier componente de carga que prefieras
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
