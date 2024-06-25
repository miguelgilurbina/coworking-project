import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/Context/AuthContext';
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import * as Icons from "react-icons/fa";
import TermsOfUse from "./TermsOfUse";
import Shared from "./Shared";

const iconList = Object.keys(Icons).map((icon) => {
  return {
    name: icon,
    component: Icons[icon],
  };
});

const Gallery = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);

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
      <li key={index}>
        {characteristic.icon && (
          <span className="icon-space">{renderIcon(characteristic.icon)}</span>
        )}
        <span>{characteristic.name}</span>
      </li>
    ));
  };

  const renderIcon = (iconName) => {
    const selectedIcon = iconList.find((icon) => icon.name === iconName);
    if (selectedIcon) {
      const IconComponent = selectedIcon.component;
      return <IconComponent />;
    }
    return null;
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

  const handleBookNowClick = () => {
    if (user) {
      navigate('/seleccionarFecha');
    } else {
      navigate('/login', { state: { fromGallery: true } });
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="center">
      <div className="containerDetail">
        <div className="containerButton">
          <Link to="/home" className="genericButton link-flex">
            <FaArrowLeft className="iconSpace" /> Go back
          </Link>
        </div>
        <div className={`${showCarousel ? "hideContent" : "cardDetail"}`}>
          <div className="cardHeader">
            <div className="titleSubtitle">
              {/* <h3 className="titleCard">Home Office</h3>
              <h5 className="subtitleCard">Harmony</h5> */}
            </div>
            <Shared title="Home Office" subtitle="Harmony" />
          </div>

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
                        width: "230px",
                        height: "245px",
                        borderRadius: "20px",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>
                  Our co-working space is designed to provide a comfortable and
                  productive environment for professionals from various
                  industries. With high-speed internet access, ergonomic chairs,
                  and well-lit work areas, we offer the ideal setting for you to
                  focus on your projects. The room also features collaborative
                  spaces where you can interact with other members, as well as
                  more private areas for when you need a bit of tranquility.
                  Additionally, we have state-of-the-art equipment such as
                  projectors and whiteboards to facilitate your presentations
                  and meetings.
                </p>
              </div>
            </>
          )}

          <div className="buttonSeeMore">
            <div className="containerButtonGallery">
              {!showCarousel && (
                <button onClick={handleBookNowClick} className="genericButton">
                  Book Now
                </button>
              )}
            </div>

            <button
              className="button-generic-transition"
              onClick={toggleCarousel}
            >
              {showCarousel ? (
                <>
                  <FaArrowLeft className="iconSpace" />
                  &nbsp;Go Details
                </>
              ) : (
                "More Pictures"
              )}
            </button>
          </div>

          {!showCarousel && (
            <div className="features">
              <h4>Characteristics:</h4>
              <ul>{renderCharacteristics()}</ul>
            </div>
          )}

          {!showCarousel && <TermsOfUse />}
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