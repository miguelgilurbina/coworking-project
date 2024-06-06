import { useState } from "react";
import "../Styles/Explorer.css";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Explorer = () => {

  const [query, setQuery] = useState('');
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const placeholder= 'Number of people...'
 

  const searchProducts = () => {
    console.log(`Buscando productos con la consulta "${query}" y la fecha "${date}" y la cantidad de personas ${quantity}`);
  };
 //Esta comentado por la falta de la api y para que me funcionara el searchProducts de ⬆️ con el console.log 
  /* const searchProducts = async () => {
    try {
      const response = await axios.get(`https://nuestra_api/products?query=${query}&date=${date}&quantity=${quantity}`);
      setProducts(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }; */
  return (
    <div className="explorer">
      <h4>Where do you want to work today?</h4>

      <form action="GET">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your Space..." />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <input type="number" value={quantity} onChange={(e) => {
    const valorIngresado = e.target.value;
    if (!isNaN(valorIngresado) && valorIngresado >= 1) {
      setQuantity(valorIngresado);
    }
  }} placeholder={placeholder} />
      </form>

      <div className="d-flex justify-content-center pt-2">
        <button className="buttonSearchExplorer" onClick={searchProducts}>Search</button>
      </div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        
      ))}
    </div>
  );
};

export default Explorer;