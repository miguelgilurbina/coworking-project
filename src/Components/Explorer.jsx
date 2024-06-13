import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Explorer.css";
import DatePicker from "react-datepicker";
import Autosuggest from "react-autosuggest";
import "react-datepicker/dist/react-datepicker.css";

const Explorer = () => {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const placeholder = "Number of people...";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3003/data");
      const data = response.data;
      console.log("Data received from API:", data); // Agregar un log para verificar los datos recibidos
      const productNames = data.map((product) => product.name);
      setProducts(productNames);
    } catch (error) {
      console.error("Error fetching products:", error); // Manejar errores de la solicitud
    }
  };

  const searchProducts = () => {
    console.log(
      `Buscando productos con la consulta "${query}" y la fecha "${date}" y la cantidad de personas ${quantity}`
    );
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : products.filter(
          (product) =>
            product.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Buscar productos...",
    value: query,
    onChange: (_, { newValue }) => setQuery(newValue),
  };

  return (
    <div className="explorer">
      <h4>Where do you want to work today?</h4>

      <form action="GET">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => (
            <div className="suggestion-item">{suggestion}</div>
          )}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          theme={{
            suggestionsContainer: "suggestions-container",
            suggestionHighlighted: "suggestion-item--highlighted",
          }}
        />

        <div className="date-picker-wrapper">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const valorIngresado = e.target.value;
            if (!isNaN(valorIngresado) && valorIngresado >= 1) {
              setQuantity(valorIngresado);
            }
          }}
          placeholder={placeholder}
        />
      </form>

      <div className="d-flex justify-content-center pt-2">
        <button className="buttonSearchExplorer" onClick={searchProducts}>
          Search
        </button>
      </div>
      {/* Aquí no necesitas mostrar los productos */}
    </div>
  );
};

export default Explorer;
