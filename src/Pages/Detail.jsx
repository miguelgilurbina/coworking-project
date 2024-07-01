import Gallery from "../Components/Gallery";
import { useParams } from 'react-router-dom';
import "../Styles/Detail.css";

const Detail = () => {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL dinámica
  return (
    <div>
      <Gallery roomId ={id} />
    </div>
  );
};

export default Detail;
