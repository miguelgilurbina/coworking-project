import React, { useState, useEffect } from "react";
import Explorer from "../Components/Explorer";
import Category from "../Components/Category";
import Recommend from "../Components/Recommend";
import FilteredResults from "../Components/FilteredResults";
import axios from "axios";
import "../Styles/Home.css";

const Home = () => {
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (filteredCategory) {
        try {
          const response = await axios.get("http://localhost:3003/data");
          const data = response.data || [];
          const filtered = data.filter(
            (item) => item.Category === filteredCategory
          );
          setFilteredData(filtered);
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        }
      }
    };

    fetchData();
  }, [filteredCategory]);

  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  const clearFilters = () => {
    setFilteredCategory(null);
    setFilteredData([]);
  };

  return (
    <div className="home">
      <Explorer />
      <Category onFilter={handleFilter} />
      {filteredCategory && (
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
