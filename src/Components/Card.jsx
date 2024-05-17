import "../Styles/Card.css"
import PropTypes from "prop-types"
const Card = ({data}) => {
  return (
    <div className="card" key= {data.id}>
      <img src={data.srcImg} alt="Imagen del Espacio" />
      <div className="card-description">
        <h4>{data.name}</h4>
        <p>{data.description}</p>
      </div>
        
    </div>
  )
};

Card.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Card