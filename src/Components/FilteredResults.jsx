import React from "react";
import Card from "./Card";
import "../Styles/Recommend.css";

const FilteredResults = ({ filteredData }) => {
  return (
    <div className="container mt-4 pt-2 container-background">
      <h2>Filtered Results</h2>
      <div className="recommend">
        {filteredData.length === 0 ? (
          <p>No results found for the selected category.</p>
        ) : (
          filteredData.map((item) => <Card key={item.id} data={item} />)
        )}
      </div>
    </div>
  );
};

export default FilteredResults;
