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
  const imagery = [image, image1, image2, image3, image4];
  const [showCarousel, setShowCarousel] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    beforeChange: (current, next) => {
      const diff = next - current;
      if (Math.abs(diff) > 1) {
        const imageryCopy = [...imagery];
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            const shifted = imageryCopy.shift();
            imageryCopy.push(shifted);
          }
        } else {
          for (let i = 0; i < Math.abs(diff); i++) {
            const popped = imageryCopy.pop();
            imageryCopy.unshift(popped);
          }
        }
        setImagery(imageryCopy);
      }
    },
  };

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  return (
    // <div className='center'>
    // <div className='cardTotal'>
    // <div className='containerDetail'>

    <div className="contenedorBody">
      <div className={`cardDetail ${showCarousel ? "hideContent" : ""}`}>
        <h1>Home Office</h1>
        <div className="buttonDetail">
          <button className="genericButton">⬅️ Back</button>
        </div>
        <div className="separador"></div>

        {!showCarousel && (
          <div className="containerImg">
            <img src={image} alt="" className="imgHero" />
            <div className="gridDetail">
              {imagery.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  src={image}
                  alt={`Image of room`}
                  style={{ width: "200px", height: "300px", borderRadius: 20 }}
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
              Perferendis voluptatibus ducimus sed aperiam impedit officiis, sit
              suscipit exercitationem ratione, natus ad adipisci eveniet saepe
              voluptatum eum provident voluptates, nemo quaerat iste. Vitae
              laboriosam, dicta minus nihil officiis ipsam?
            </span>
          </div>
        )}
        <div className="buttonSeeMore">
          <button
            className="button-generic-transition"
            onClick={toggleCarousel}
          >
            {showCarousel ? "Hide Pictures" : "See More Pictures"}
          </button>
        </div>
        <div className="containerButton">
          {!showCarousel && <button className="genericButton">Book Now</button>}
        </div>
      </div>
      {showCarousel && (
        <div className="cardDetail carouselContainer">
          <Slider {...settings}>
            {imagery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image of room`}
                className={index === 0 ? "slick-current" : ""}
                style={{ borderRadius: "10px" }}
              />
            ))}
          </Slider>
        </div>
      )}
      <div className="separador"></div>
    </div>

    // </div>
    // </div>
  );
};

export default Gallery;
