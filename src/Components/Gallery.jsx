import React, { useState, useEffect } from "react";
import { useAuth } from '../Components/Context/AuthContext';
import { useHistory } from 'react-router-dom';
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

const Gallery = () => {
  const { user } = useAuth();
  const history = useHistory();

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
    const fetchData = async () => {
      try {
        // Obtener detalles del elemento según el id
        const response = await fetch(`http://localhost:3004/items/${id}`); // Reemplaza con la URL y endpoint correcto
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setTitle(data.name); // Establecer el título desde la respuesta del API
        setSubtitle(data.category); // Establecer el subtítulo desde la respuesta del API
        setDescription(data.description); // Establecer la descripción desde la respuesta del API
        setImagery([data.image, ...data.additionalImages]); // Actualizar las imágenes desde la respuesta del API
        setCharacteristics(data.characteristics); // Establecer características desde la respuesta del API
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchData();
  }, [id]);

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

  const handleBookNowClick = () => {
    console.log("Usuario actual:", user);
    if (user) {
      history.push('/reservar');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="center">
      <div className="containerDetail">
        <div className={`${showCarousel ? "hideContent" : "cardDetail"}`}>
          <h3 className="titleCard">{title}</h3>
          <h5 className="subtitleCard">{subtitle}</h5>

          {!showCarousel && (
            <>
              <div className="containerImg">
                <img src={imagery[0]} alt="Main" className="imgHero" />
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
                  {description}
                </span>
              </div>
            </>
          )}

          <div className="buttonSeeMore">
            <div className="containerButtonGallery">
              {!showCarousel && (
                <button className="genericButton Link-flex" onClick={handleBookNowClick}>
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

          {!showCarousel && (
            <div className="termsOfUse">
              <button className="button-generic-transition" onClick={toggleTerms}>
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
                <p>
                  <strong>1. Introducción</strong><br />
                  Bienvenido al espacio de <strong>Co-Working</strong>. Al utilizar nuestras instalaciones y servicios, usted acepta cumplir con los siguientes Términos de Uso. Estos términos están diseñados para asegurar que todos los usuarios puedan disfrutar de un entorno seguro, cómodo y productivo.
                </p>
                <p>
                  <strong>2. Registro y Membresía</strong><br />
                  <strong>Registro:</strong> Todos los usuarios deben registrarse y proporcionar información válida y actualizada para poder utilizar nuestras instalaciones.<br />
                  <strong>Membresía:</strong> Los planes de membresía pueden incluir acceso diario, mensual o anual, y están sujetos a los términos especificados en el contrato de membresía.
                </p>
                <p>
                  <strong>3. Acceso y Uso del Espacio</strong><br />
                  <strong>Horario:</strong> El espacio de coworking está disponible para su uso durante los horarios establecidos, los cuales son de Lunes a Viernes de 09:00 a 19:00 hrs.<br />
                  <strong>Uso Aceptable:</strong> Los usuarios deben utilizar las instalaciones de manera responsable, respetando a otros miembros y el equipo del espacio de coworking.
                </p>
                <p>
                  <strong>4. Conducta del Usuario</strong><br />
                  <strong>Respeto y Consideración:</strong> Todos los usuarios deben comportarse de manera profesional y respetuosa. No se tolerará ninguna forma de acoso, discriminación o comportamiento disruptivo.<br />
                  <strong>Ruido:</strong> Mantener niveles de ruido adecuados para no perturbar a otros usuarios. Se recomienda el uso de auriculares para llamadas telefónicas y videoconferencias.<br />
                  <strong>Limpieza y Orden:</strong> Mantener su área de trabajo limpia y ordenada. Desechar la basura en los contenedores adecuados y no dejar pertenencias personales desatendidas.
                </p>
                <p>
                  <strong>5. Seguridad y Responsabilidad</strong><br />
                  <strong>Seguridad:</strong> Los usuarios son responsables de la seguridad de sus pertenencias personales. El espacio de coworking no se hace responsable por pérdidas o daños de artículos personales.<br />
                  <strong>Emergencias:</strong> Familiarizarse con las salidas de emergencia y los procedimientos de evacuación en caso de incendio u otra emergencia.<br />
                  <strong>Responsabilidad:</strong> Los usuarios son responsables de cualquier daño causado al mobiliario, equipo o instalaciones del espacio de coworking.
                </p>
                <p>
                  <strong>6. Servicios y Equipos</strong><br />
                  <strong>Internet:</strong> Proporcionamos acceso a Internet de alta velocidad. Sin embargo, no somos responsables por interrupciones en el servicio.<br />
                  <strong>Impresoras y Escáneres:</strong> El uso de impresoras y escáneres está disponible para todos los usuarios. Por favor, sea considerado con el consumo de papel y tinta.
                </p>
                <p>
                  <strong>7. Reservas y Espacios Privados</strong><br />
                  <strong>Reservas:</strong> Algunos espacios privados y salas de reuniones requieren reserva previa. Por favor, utilice el sistema de reservas para asegurar la disponibilidad.<br />
                  <strong>Cancelaciones:</strong> Las cancelaciones de reservas deben hacerse con al menos 24 horas de antelación para evitar cargos adicionales.
                </p>
                <p>
                  <strong>8. Modificaciones de los Términos</strong><br />
                  Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios se publicarán en nuestra página web y entrarán en vigor de inmediato.
                </p>
                <p>
                  <strong>9. Contacto</strong><br />
                  Si tiene alguna pregunta o inquietud acerca de estos Términos de Uso, por favor contáctenos en soporte@coworking.com.
                </p>
              </div>
              )}
            </div>
          )}
        </div>

        {showCarousel && (
          <div className="carousel">
            <Slider {...settings}>
              {imagery.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;