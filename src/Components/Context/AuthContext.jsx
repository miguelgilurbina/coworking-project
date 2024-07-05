import React, { createContext, useState, useContext } from "react";
import {apiUsuario} from "../../Data/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      console.log("Datos del formulario:", formData);
      //TODO: INTEGRAR CON BACK
      const response = await apiUsuario.get("/MOCK_DATAGET", {
        params: formData, // Envía el formulario como parámetros de consulta
      });

      console.log("Respuesta de la API:", response.data);

      // Busca un usuario que coincida con el correo electrónico
      const foundUser = response.data.find((u) => u.email === formData.email);

      console.log("Usuario encontrado:", foundUser);

      if (foundUser && foundUser.password === formData.password) {
        setUser(foundUser); // Establece el usuario encontrado como usuario actual
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Propaga el error para que pueda ser manejado por el componente de inicio de sesión
    }
  };

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
