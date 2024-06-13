import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const FavoriteContext = createContext();

// Proveedor del contexto
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (card) => {
    setFavorites((prevFavorites) => [...prevFavorites, card]);
  };

  const removeFavorite = (cardId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== cardId));
  };

  const isFavorite = (cardId) => {
    return favorites.some((favorite) => favorite.id === cardId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Hook para usar el contexto de favoritos
export const useFavorites = () => useContext(FavoriteContext);