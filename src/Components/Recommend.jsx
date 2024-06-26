import { useEffect, useState } from "react";
import data from "../Data/recommendData.json";
import Card from "./Card.jsx";
import Pagination from "./Pagination";
import "../Styles/Recommend.css";

const Recommend = () => {
  const getItemsPerPage = (width) => {
    if (width <= 340) return 2;
    if (width <= 600) return 5;
    return 10;
  };

  const [recommendData, setRecommendData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    getItemsPerPage(window.innerWidth)
  );

  useEffect(() => {
    const dataArray = Object.values(data.data);
    const shuffledData = shuffleArray(dataArray);
    setRecommendData(shuffledData);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setItemsPerPage(getItemsPerPage(window.innerWidth));
      setCurrentPage(1);
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
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTotalPages = () => {
    return Math.ceil(recommendData.length / itemsPerPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = recommendData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <h2 className="m-4">Recommended rooms</h2>

      <div className="recommend">
        {paginatedData.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages()}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Recommend;
