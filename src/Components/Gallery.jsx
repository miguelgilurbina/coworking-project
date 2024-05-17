"useclient";
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

const Gallery = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [imagery, setImagery] = useState([
    image,
    image1,
    image2,
    image3,
    image4,
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
  };

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  return (
    <div className="center">
      <div className="containerDetail">
        <div className="buttonDetail">
          <button className="button-generic-transition">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>{" "}
            Back
          </button>
        </div>
        <div className={`${showCarousel ? "hideContent" : "cardDetail"}`}>
          <h3 class="titleCard">Home Office</h3>
          <h5 class="subtileCard">Harmony</h5>

          {!showCarousel && (
            <div className="containerImg">
              <img src={image} alt="" className="imgHero" />
              <div className="gridDetail">
                {/* TODO: REVISAR EL STYLE */}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis vel nobis recusandae cupiditate consectetur iste
                quaerat explicabo. Eius, quaerat exercitationem placeat,
                distinctio doloremque hic sit unde inventore possimus, rem eos!
                Perferendis voluptatibus ducimus sed aperiam impedit officiis,
                sit suscipit exercitationem ratione, natus ad adipisci eveniet
                saepe voluptatum eum provident voluptates, nemo quaerat iste.
                Vitae laboriosam, dicta minus nihil officiis ipsam?
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
              className="button-generic-transition"
              onClick={toggleCarousel}
            >
              {showCarousel ? "Hide Pictures" : "See More Pictures"}
            </button>
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
