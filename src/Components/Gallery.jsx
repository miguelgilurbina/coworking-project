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
                  <strong>Internet:</strong> Proporcionamos acceso a internet de alta velocidad. El uso de la red debe ser legal y adecuado, evitando actividades como la descarga de contenido ilegal.<br />
                  <strong>Equipos Comunes:</strong> Los usuarios pueden utilizar equipos comunes (impresoras, fotocopiadoras, etc.) según disponibilidad. Deben seguir las instrucciones de uso y reportar cualquier problema al personal del espacio.
                </p>
                <p>
                  <strong>7. Reservas y Uso de Salas</strong><br />
                  <strong>Reservas:</strong> Las salas de reuniones y otros espacios reservables deben ser reservados con antelación a través del sistema de reservas del espacio de coworking.<br />
                  <strong>Uso:</strong> Utilizar las salas de reuniones solo por el tiempo reservado y dejar el espacio limpio y ordenado para el siguiente usuario.
                </p>
                {/* <p>
                  <strong>8. Eventos y Actividades</strong><br />
                  <strong>Eventos Internos:</strong> Los usuarios pueden participar en eventos y actividades organizados por el espacio de coworking. Estos eventos están sujetos a sus propios términos y condiciones.<br />
                  <strong>Eventos Externos:</strong> La organización de eventos externos debe ser aprobada previamente por la administración del espacio de coworking.
                </p> */}
                <p>
                  <strong>8. Pago y Facturación</strong><br />
                  <strong>Pago:</strong> Las cuotas de membresía y otros cargos deben ser pagados puntualmente según lo acordado en el contrato de membresía.<br />
                  <strong>Facturación:</strong> Las facturas serán enviadas a la dirección de correo electrónico proporcionada por el usuario y deben ser pagadas dentro del período especificado.
                </p>
                <p>
                  <strong>9. Terminación y Cancelación</strong><br />
                  <strong>Terminación por el Usuario:</strong> Los usuarios pueden cancelar su membresía siguiendo el proceso establecido en el contrato de membresía.<br />
                  <strong>Terminación por el Espacio de Coworking:</strong> Nos reservamos el derecho de terminar la membresía de cualquier usuario que infrinja estos Términos de Uso o el contrato de membresía.
                </p>
                <p>
                  <strong>10. Modificaciones de los Términos</strong><br />
                  Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Las modificaciones se comunicarán a los usuarios a través del correo electrónico registrado o mediante avisos en el espacio de coworking.
                </p>
                <p>
                  <strong>11. Contacto</strong><br />
                  Para cualquier pregunta o comentario sobre estos Términos de Uso, por favor contacte a la administración del espacio de coworking en espacios@coworking.cl.
                </p>
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
