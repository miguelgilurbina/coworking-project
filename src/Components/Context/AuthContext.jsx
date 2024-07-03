import React, { createContext, useContext, useState, useEffect} from 'react';
import api from '../../api/axiosconfig';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
 
 
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsuario = localStorage.getItem('usuario');
    if (token && storedUsuario) {
      setUsuario(JSON.parse(storedUsuario)); 
      
    } 
      setLoading(false);
    
  }, []);

  const login = async (token, refreshToken, usuario) => {

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('usuarior', JSON.stringify(usuario));
    setUsuario(usuario);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresToken');
      localStorage.removeItem('usuario');
      setUsuario(null);
      delete axios.defaults.headers.common['Authorization'];
    }

   const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/api/auth/refresh', { token: refreshToken });
      const { token, usuario } = response.data;
      await login(token, refreshToken, usuario);
      return token;
    } catch (error) {
      logout();
      throw error;
    }
  };


  const value = {
    usuario,
    login,
    logout,
    refreshToken,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
  
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

