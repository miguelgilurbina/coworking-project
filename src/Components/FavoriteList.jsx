import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { useFavorites } from "../Components/Context/FavoriteContext"; // Ajusta la ruta según tu estructura de carpetas
import Card from "../Components/Card"; // Ajusta la ruta según tu estructura de carpetas
import "../Styles/admin.css";

const FavoriteList = () => {
  const { favorites } = useFavorites();

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/home" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">Favorites rooms</h2>

      <div
        className="container containerRecommend"
        style={{ marginBottom: "100px" }}
      >
        <div className="favorite-list">
          {favorites.length === 0 ? (
            <div className="alert alert-warning d-flex" role="alert">
              <div>
                <FaExclamationTriangle style={{ marginRight: "8px" }} />
              </div>
              No favorite rooms yet.
            </div>
          ) : (
            <div className="row">
              {favorites.map((favorite) => (
                <Card key={favorite.id} data={favorite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
