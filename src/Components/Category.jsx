import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import "../Styles/Category.css";

const Category = () => {
  const [recommendData, setRecommendData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/categories');
        console.log('API Response:', response.data);

        const categoriesArray = response.data || [];
        console.log('Categories Array:', categoriesArray);

        const shuffledData = shuffleArray(categoriesArray);
        console.log('Shuffled Data:', shuffledData);

        setRecommendData(shuffledData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  if (error) {
    return <div className="container containerRecommend">Error: {error}</div>;
  }

  return (
    <div className="container containerRecommend">
      <h2 className="mb-4">Categories</h2>
      <div className="category">
        {recommendData.length === 0 ? (
          <p>No categories available</p>
        ) : (
          recommendData.map((category) => {
            console.log('Rendering CategoryCard with:', category);
            return (
              <CategoryCard
                key={category.id}  // Using category.id as key
                title={category.title}
                description={category.description}
                srcImg={category.srcImg}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Category;