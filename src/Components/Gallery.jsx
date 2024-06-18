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
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [termsCollapsed, setTermsCollapsed] = useState(true);

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
  const toggleTerms = () => {
    setTermsCollapsed(!termsCollapsed);
  };

  return (
    <div className="center">
      <div className="containerDetail">
        <div className="containerButton">
          <Link to="/home" className="genericButton link-flex">
            <FaArrowLeft className="iconSpace" /> Go back
          </Link>
        </div>
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
                        height: "250px",
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

          {!showCarousel && (
            <div className="termsOfUse">
              <button
                className="button-generic-transition"
                onClick={toggleTerms}
                style={{
                  textDecoration: "underline",
                  width: "max-content",
                }}
              >
                {termsCollapsed ? (
                  <>
                    <FaChevronDown className="iconSpace" />
                    &nbsp;Show Terms of Use
                  </>
                ) : (
                  <>
                    <FaChevronUp className="iconSpace" />
                    &nbsp;Hide Terms of Use
                  </>
                )}
              </button>
              {!termsCollapsed && (
                <div className="termsContent">
                  <div className="termsColumns">
                    <div className="termsColumn">
                      <p>
                        <strong>1. Introduction</strong>
                        <br />
                        Welcome to the <strong>Co-Working</strong> space. By
                        using our facilities and services, you agree to comply
                        with the following Terms of Use.
                      </p>
                      <p>
                        <strong>2. Registration and Membership</strong>
                        <br />
                        <strong>Registration:</strong> All users must register
                        and provide valid and updated information to use our
                        facilities.
                        <br />
                        <strong>Membership:</strong> Membership plans may
                        include daily, monthly, or annual access and are subject
                        to the terms specified in the membership contract.
                      </p>
                      <p>
                        <strong>3. Access and Use of the Space</strong>
                        <br />
                        <strong>Hours:</strong> The coworking space is available
                        for use during the established hours, which are Monday
                        to Friday from 9:00 AM to 7:00 PM.
                        <br />
                      </p>
                      <p>
                        <strong>4. User Conduct</strong>
                        <br />
                        <strong>Respect and Consideration:</strong> All users
                        must behave professionally and respectfully. No form of
                        harassment, discrimination, or disruptive behavior will
                        be tolerated.
                        <br />
                        <strong>Noise:</strong> Maintain appropriate noise
                        levels to avoid disturbing other users. The use of
                        headphones for phone calls and video conferences is
                        recommended.
                        <br />
                        <strong>Cleanliness and Order:</strong> Keep your
                        workspace clean and orderly. Dispose of trash in the
                        appropriate containers and do not leave personal
                        belongings unattended.
                      </p>
                      <p>
                        <strong>5. Security and Responsibility</strong>
                        <br />
                        <strong>Security:</strong> Users are responsible for the
                        security of their personal belongings. The coworking
                        space is not responsible for loss or damage to personal
                        items.
                        <br />
                        <strong>Responsibility:</strong> Users are responsible
                        for any damage caused to the furniture, equipment, or
                        facilities of the coworking space.
                      </p>
                    </div>
                    <div className="termsColumn">
                      <p>
                        <strong>6. Services and Equipment</strong>
                        <br />
                        <strong>Internet:</strong> We provide high-speed
                        internet access. The use of the network must be legal
                        and appropriate, avoiding activities such as downloading
                        illegal content.
                        <br />
                        <strong>Common Equipment:</strong> Users may use common
                        equipment (printers, copiers, etc.) subject to
                        availability.
                      </p>
                      <p>
                        <strong>7. Reservations and Use of Rooms</strong>
                        <br />
                        <strong>Reservations:</strong> Meeting rooms and other
                        reservable spaces must be booked in advance through the
                        coworking space's reservation system.
                        <br />
                        <strong>Use:</strong> Use the meeting rooms only for the
                        reserved time and leave the space clean and orderly for
                        the next user.
                      </p>
                      <p>
                        <strong>8. Payment</strong>
                        <br />
                        <strong>Payment:</strong> Membership fees and other
                        charges must be paid promptly as agreed in the
                        membership contract.
                        <br />
                      </p>
                      <p>
                        <strong>9. Termination and Cancellation</strong>
                        <br />
                        <strong>Termination by the User:</strong> Users may
                        cancel their membership by following the process
                        established in the membership contract.
                        <br />
                        <strong>Termination by the Coworking Space:</strong> We
                        reserve the right to terminate the membership of any
                        user who violates these Terms of Use.
                      </p>
                      <p>
                        <strong>10. Modifications to the Terms</strong>
                        <br />
                        We reserve the right to modify these Terms of Use at any
                        time. Modifications will be communicated to users via
                        the registered email.
                      </p>
                      <p>
                        <strong>11. Contact</strong>
                        <br />
                        For any questions or comments about these Terms of Use,
                        please contact the coworking space administration at
                        espacios@coworking.cl.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
