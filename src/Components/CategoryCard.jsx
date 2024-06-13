import React from "react";
import "../Styles/CategoryCard.css";

const CategoryCard = ({ title, description, srcImg }) => {
  return (
    <div className="cardC">
      <img src={srcImg} alt={title} className="card-image" />
      <div className="card-content">
        <h4 className="card-title text-center">{title}</h4>
        <p className="cardDescription">{description}</p>
        <button className="button-generic-transition mb-3">Filter By</button>
      </div>
    </div>
  );
};

export default CategoryCard;
