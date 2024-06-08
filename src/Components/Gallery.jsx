import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Gallery.css";
import image1 from "../../public/images/img_aleatory_1.png";
import image2 from "../../public/images/img_aleatory_2.png";
import image3 from "../../public/images/img_aleatory_3.png";
import image4 from "../../public/images/img_aleatory_4.png";
import image from "../../public/images/img_aleatory.png";
import { FaArrowLeft } from "react-icons/fa";

const Gallery = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [imagery, setImagery] = useState([
    image,
    image1,
    image2,
    image3,
    image4,
  ]);
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        //TODO: INTEGRAR CON BACK
        const response = await fetch("http://localhost:3004/caracteristicas");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setCharacteristics(data);
      } catch (error) {
        console.error("Error fetching characteristics:", error);
      }
    };

    fetchCharacteristics();
  }, []);

  const renderCharacteristics = () => {
    return characteristics.map((characteristic, index) => (
      <li key={index}>{characteristic.name}</li>
    ));
  };

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
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
            <>
              <div className="containerImg">
                <img src={image} alt="Main" className="imgHero" />
                <div className="gridDetail">
                  {imagery.slice(1).map((image, index) => (
                    <img
                      key={index + 1}
                      src={image}
                      alt={`Image of room`}
                      style={{
                        width: "200px",
                        height: "280px",
                        borderRadius: "20px",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis vel nobis recusandae cupiditate consectetur iste
                  quaerat explicabo. Eius, quaerat exercitationem placeat,
                  distinctio doloremque hic sit unde inventore possimus, rem
                  eos! Perferendis voluptatibus ducimus sed aperiam impedit
                  officiis, sit suscipit exercitationem ratione, natus ad
                  adipisci eveniet saepe voluptatum eum provident voluptates,
                  nemo quaerat iste. Vitae laboriosam, dicta minus nihil
                  officiis ipsam?
                </span>
              </div>
            </>
          )}

          <div className="buttonSeeMore">
            <div className="containerButtonGallery">
              {!showCarousel && (
                <button className="genericButton">Book Now</button>
              )}
            </div>
            <button
              className="button-generic-transition"
              onClick={toggleCarousel}
            >
              {showCarousel ? (
                <>
                  <FaArrowLeft className="iconSpace" />
                  &nbsp;Go Back
                </>
              ) : (
                "More Pictures"
              )}
            </button>
          </div>

          {!showCarousel && (
            <div className="features">
              <h4>Características:</h4>
              <ul>{renderCharacteristics()}</ul>
            </div>
          )}
        </div>
      </div>

      {showCarousel && (
        <Slider {...settings}>
          {imagery.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Room ${index}`} className="carouselImage" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Gallery;
