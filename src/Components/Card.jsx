import React from "react";
import "../Styles/Card.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Card = ({ data }) => {
  return (
    <div className="col-md-6 d-md-inline-block p-3">
      <div className="card" style={{ maxWidth: "540px" }} key={data.id}>
        <div className="row g-0">
          <div className="col-md-4 p-2">
            <img
              src={data.srcImg}
              alt="Imagen del Espacio"
              className="img-fluid rounded-start cardHome"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.Category}</h5>
              <h5 className="subtitleCardHome">{data.name}</h5>
              
              <p className="card-text">{data.description}</p>
              <Link
                to="/detail"
                className="genericButton link-flex"
                style={{ width: "100px" }}
              >
                See more <FaChevronRight className="icon-space" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Card;
