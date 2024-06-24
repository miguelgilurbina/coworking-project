import React, { useState } from "react";
import "../Styles/Card.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { useAuth } from "../Components/Context/AuthContext";
import { useFavorites } from "../Components/Context/FavoriteContext";

const Card = ({ data }) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(data.id)) {
      removeFavorite(data.id);
    } else {
      addFavorite(data);
    }
  };

  const iconSize = 25;

  return (
    <div className="col-md-6 d-md-inline-block p-3">
      <div className="card" style={{ maxWidth: "540px" }} key={data.id}>
        <div className="row g-0">
          <div className="col-md-4 p-2">
            <img
              src={data.srcImg}
              alt="Imagen del Espacio"
              className="rounded-start cardHome"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{data.Category}</h5>
                {user && (
                  <button
                    className="btn btn-link p-0 m-0"
                    onClick={toggleFavorite}
                    style={{
                      color: isFavorite(data.id) ? "gold" : "gray",
                      fontSize: `${iconSize}px`,
                    }}
                  >
                    {isFavorite(data.id) ? (
                      <FaCoffee size={iconSize} />
                    ) : (
                      <FiCoffee size={iconSize} />
                    )}
                  </button>
                )}
              </div>
              <h5 className="subtitleCardHome">{data.name}</h5>
              <p className="card-text">{data.description}</p>
              <Link
                to="/detail"
                className="genericButton link-flex"
                style={{ width: "100px" }}
              >
                See more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
export default Card;
