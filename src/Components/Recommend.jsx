import { useEffect, useState } from "react";
import data from "../Data/recommendData.json";
import Card from "./Card.jsx";
import "../Styles/Recommend.css";

const Recommend = () => {
  const [recommendData, setRecommendData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const dataArray = Object.values(data.data);
    const shuffledData = shuffleArray(dataArray);
    setRecommendData(shuffledData);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="container">
      <div className="recommend">
        {windowWidth <= 340 && recommendData.slice(0, 2).map((item) => (
          <Card data={item} key={item.id} />
        ))}
        {windowWidth > 340 && windowWidth <= 600 && recommendData.slice(0, 5).map((item) => (
          <Card data={item} key={item.id} />
        ))}
        {windowWidth > 600 && recommendData.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;