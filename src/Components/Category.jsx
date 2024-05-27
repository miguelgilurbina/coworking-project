import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard'; // Importa el componente CategoryCard
import data from '../Data/categoryData.json'; // Importa los datos del JSON
import "../Styles/Category.css"

const Category = () => {
  const [recommendData, setRecommendData] = useState([]);

  useEffect(() => {
    // Extrae el array de categorías del objeto data
    const categoriesArray = data.categories || [];

    // Baraja el array de categorías
    const shuffledData = shuffleArray(categoriesArray);

    // Establece los datos recomendados barajados en el estado
    setRecommendData(shuffledData);
  }, []);

  // Función para barajar un array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="category">
      {recommendData.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          description={category.description}
          srcImg={category.srcImg}
        />
      ))}
    </div>
  );
};

export default Category;