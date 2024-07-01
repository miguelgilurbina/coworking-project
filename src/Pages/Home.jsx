import React, { useState, useEffect } from "react";
import Explorer from "../Components/Explorer";
import Category from "../Components/Category";
import Recommend from "../Components/Recommend";
import FilteredResults from "../Components/FilteredResults";
import api from "../api/axiosconfig";
import "../Styles/Home.css";

const Home = () => {
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token")

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await api.get("http://localhost:8080/data");
        const data = response.data || [];

        let filtered = data;

        if (filteredCategory) {
          filtered = filtered.filter(
            (item) => item.Category === filteredCategory
          );
        }

        if (searchCriteria) {
          const { query, date, quantity } = searchCriteria;

          if (query) {
            filtered = filtered.filter(
              (item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );
          }

          if (date) {
            const selectedDate = date.toISOString().split("T")[0];
            filtered = filtered.filter(
              (item) => item.availability && item.availability[selectedDate]
            );
          }

          if (quantity) {
            switch (quantity) {
              case "1":
                filtered = filtered.filter((item) => item.people === 1);
                break;
              case "2-5":
                filtered = filtered.filter(
                  (item) => item.people >= 2 && item.people <= 5
                );
                break;
              case "6-12":
                filtered = filtered.filter(
                  (item) => item.people >= 6 && item.people <= 12
                );
                break;
              case "all":
              default:
                break;
            }
          }
        }

        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filteredCategory, searchCriteria]);

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
