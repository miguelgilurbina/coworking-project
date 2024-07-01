import React from "react";
import "../Styles/CategoryCard.css";

const CategoryCard = ({ title, description, srcImg, onFilter }) => {
  return (
    <div className="cardC">
      <img src={srcImg} alt={title} className="card-image" />
      <div className="card-content">
        <div>
          <h4 className="card-title-category text-center">{title}</h4>
          <p className="cardDescription">{description}</p>
        </div>
        <button
          className="button-generic-transition2 mb-3"
          onClick={() => onFilter(title)}
        >
          Filter By
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
