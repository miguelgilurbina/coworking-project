import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsuario = localStorage.getItem('usuario');
    if (token && storedUsuario) {
      setUsuario(JSON.parse(storedUsuario)); 
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
      const { usuario } = response.data;
      setUsuario(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      const { token, usuario } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setUsuario(usuario);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    setUsuario(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);