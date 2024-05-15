import "../Styles/Card.css"
import PropTypes from "prop-types"
const Card = ({data}) => {
  return (
    <div className="card" key= {data.id}>
    <img src={data.srcImg} alt="Imagen del Espacio" />
    <h2>{data.name}</h2>
        
    </div>
  )
};

Card.propTypes = {
    data: PropTypes.object.isRequired
};

export default Card