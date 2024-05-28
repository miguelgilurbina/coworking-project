import React from 'react';
import '../Styles/CategoryCard.css';

const CategoryCard = ({ title, description, srcImg }) => {
  return (
    <div className="cardC">
      <img src={srcImg} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className='button-generic-transition'>Filter By</button>
      </div>
    </div>
  );
};

export default CategoryCard;