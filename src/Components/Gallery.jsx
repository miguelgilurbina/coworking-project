import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Gallery.css";
import image1 from "../../public/images/img_aleatory_1.png";
import image2 from "../../public/images/img_aleatory_2.png";
import image3 from "../../public/images/img_aleatory_3.png";
import image4 from "../../public/images/img_aleatory_4.png";
import image from "../../public/images/img_aleatory.png";
import characteristics from "../Data/characteristics.json"

const Gallery = () => {
  const renderCharacteristics = (data) => {
    console.log(data);
    const characteristicsArray = Object.values(characteristics);
    return characteristicsArray.map((characteristic, index) => (
      <li key={index}>
        
        <span>{characteristic.name}</span>
      </li>
    ));
  };

  const [showCarousel, setShowCarousel] = useState(false);
  const [imagery, setImagery] = useState([image, image1, image2, image3, image4]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  return (
    <div className="center">
      <div className="containerDetail">
        <div className={`${showCarousel ? "hideContent" : "cardDetail"}`}>
          <h3 className="titleCard">Home Office</h3>
          <h5 className="subtitleCard">Harmony</h5>

          {!showCarousel && (
            <div className="containerImg">
              <img src={image} alt="" className="imgHero" />
              <div className="gridDetail">
                {imagery.slice(1).map((image, index) => (
                  <img
                    key={index + 1}
                    src={image}
                    alt={`Image of room`}
                    style={{
                      width: "200px",
                      height: "280px",
                      borderRadius: 20,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {!showCarousel && (
            <div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis vel nobis recusandae cupiditate consectetur
                iste quaerat explicabo. Eius, quaerat exercitationem placeat,
                distinctio doloremque hic sit unde inventore possimus, rem eos! Perferendis voluptatibus ducimus sed aperiam
                impedit officiis, sit suscipit exercitationem ratione, natus ad adipisci eveniet saepe voluptatum eum provident
                voluptates, nemo quaerat iste. Vitae laboriosam, dicta minus nihil officiis ipsam?
              </span>
            </div>
          )}
          <div className="buttonSeeMore">
            <div className="containerButton">
              {!showCarousel && (
                <button className="genericButton">Book Now</button>
              )}
            </div>
            <button
              className="button-generic-transition mb-2"
              onClick={toggleCarousel}
            >
              {showCarousel && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              )}
              {showCarousel ? " Back" : " More Pictures"}
            </button>
          </div>
          {/* Bloque de características */}
          <div className="features">
            <h4>Características:</h4>
            <ul>
            <li>Aire Libre</li>
            <li>Aire Acondicionado</li>
            <li>Pizarra</li>
            <li>Proyector</li>
            <li>Sillas Ergonomicas</li>
            <li>Sala Recreativa</li>
            <li>Cafeteria</li>
            <li>Wifi</li>
            </ul>
          </div>
        </div>
        {showCarousel && (
          <Slider {...settings}>
            {imagery.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Image of room`}
                  className="carouselImage"
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Gallery;