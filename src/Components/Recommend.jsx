import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import Pagination from "./Pagination";
import "../Styles/Recommend.css";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/salas/listar');
        const shuffledData = shuffleArray(response.data);
        setRecommendData(shuffledData);
        setError(null);
      } catch (err) {
        console.error('Error fetching salas:', err);
        if (err.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error('Error data:', err.response.data);
          console.error('Error status:', err.response.status);
          console.error('Error headers:', err.response.headers);
        } else if (err.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error('Error request:', err.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó el error
          console.error('Error message:', err.message);
        }
        setError('Error al cargar las salas. Por favor, intente de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalas();

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
    <div className="container containerRecommend" style={{marginBottom:"100px"}}>
      <h2 className="mb-4">Recommended rooms</h2>

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
