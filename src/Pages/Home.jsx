import React, { useState, useEffect } from "react";
import Explorer from "../Components/Explorer";
import Category from "../Components/Category";
import Recommend from "../Components/Recommend";
import FilteredResults from "../Components/FilteredResults";
import api from "../api/axiosconfig";
import { useAuth } from "../Components/Context/AuthContext"; // Importa el hook useAuth

import "../Styles/Home.css";

const Home = () => {
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const { user } = useAuth(); // Obtiene el contexto de autenticación

  useEffect(() => {
    const logUserRoles = () => {
      if (user) {
        console.log("Rol del usuario:", usuario.rol);
      }
    };

    const fetchData = async () => {
      try {
        const response = await api.get("http://localhost:8080/salas/listar");
        let data = response.data || [];

        // Aplicar filtros si existen
        if (filteredCategory) {
          data = data.filter((item) => item.categoria_id === filteredCategory);
        }

        if (searchCriteria) {
          const { query, date, quantity } = searchCriteria;

          if (query) {
            const lowerCaseQuery = query.toLowerCase();
            data = data.filter(
              (item) =>
                item.name.toLowerCase().includes(lowerCaseQuery) ||
                item.description.toLowerCase().includes(lowerCaseQuery)
            );
          }

          if (date) {
            const selectedDate = date.toISOString().split("T")[0];
            data = data.filter(
              (item) => item.availability && item.availability[selectedDate]
            );
          }

          if (quantity) {
            switch (quantity) {
              case "1":
                data = data.filter((item) => item.people === 1);
                break;
              case "2-5":
                data = data.filter(
                  (item) => item.people >= 2 && item.people <= 5
                );
                break;
              case "6-12":
                data = data.filter(
                  (item) => item.people >= 6 && item.people <= 12
                );
                break;
              default:
                break;
            }
          }
        }

        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    logUserRoles(); // Llama a la función para loguear el rol del usuario
    fetchData(); // Llama a la función para cargar datos al cargar el componente

  }, [filteredCategory, searchCriteria, user]); // Agrega user como dependencia

  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const clearFilters = () => {
    setFilteredCategory(null);
    setSearchCriteria(null);
    setFilteredData([]);
  };

  return (
    <div className="home">
      <Explorer onSearch={handleSearch} />
      <Category onFilter={handleFilter} />
      {(filteredCategory || searchCriteria) && (
        <>
          <FilteredResults filteredData={filteredData} />
          <div className="button-filter">
            <button onClick={clearFilters} className="clear-filters-button">
              Clear Filters
            </button>
          </div>
        </>
      )}
      <Recommend />
    </div>
  );
};

export default Home;