import React from "react";
import { useFavorites } from "../Components/Context/FavoriteContext"; // Ajusta la ruta según tu estructura de carpetas
import Card from "../Components/Card"; // Ajusta la ruta según tu estructura de carpetas

const FavoriteList = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container containerRecommend" style={{marginBottom:"100px"}}>
    <div className="favorite-list">
      <h2>Favorites</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <Card key={favorite.id} data={favorite} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default FavoriteList;