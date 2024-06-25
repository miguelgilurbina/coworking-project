import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Context/AuthContext";
import { useBooking } from "./Context/BookingContext";
import Modal from "./Modal";
import "../Styles/Booking.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookingForm = () => {
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta Credito");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const { user } = useAuth();
  const { booking } = useBooking();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/data");
        console.log("API Response:", response.data);

        const dataArray = response.data || [];

        const roomData = dataArray.find((item) => item.id === "1");
        if (roomData) {
          setRoom(roomData);
        } else {
          setRoom(null);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalCost = () => {
    if (room && room.price) {
      const hoursSelected = booking.endTime - booking.startTime;
      return hoursSelected * room.price;
    }
    return 0;
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user || !room) {
      setModalContent({
        title: "Error",
        body: "Faltan datos del usuario o de la sala",
      });
      setModalVisible(true);
      return;
    }

    const reservationData = {
      userName: `${user.first_name} ${user.last_name}`,
      userEmail: user.email,
      roomId: room.id,
      roomName: room.name,
      startTime: booking.startTime,
      endTime: booking.endTime,
      paymentMethod,
      totalCost: calculateTotalCost(),
    };

    try {
      const response = await axios.post(
        "http://localhost:3005/reservas",
        reservationData
      );
      console.log("Reserva realizada:", response.data);
      setModalContent({
        title: "Éxito",
        body: "Reserva realizada con éxito",
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error realizando la reserva:", error);
      setModalContent({
        title: "Error",
        body: "Error realizando la reserva",
      });
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    
    <div
      className="contenedorBody d-flex flex-column justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="containerButton">
        <Link to="/detail" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">List & Add Characteristics</h2>
      {modalVisible && (
        <Modal
          title={modalContent.title}
          body={modalContent.body}
          onClose={closeModal}
          onConfirm={closeModal}
        />
      )}
      <div className="row mb-4 w-100">
        <div className="col-12">
          <div
            className="card p-3 shadow-sm border-warning"
            style={{ borderColor: "#de8a05" }}
          >
            <h2 className="card-title text-center">Datos del Usuario</h2>
            {user ? (
              <div>
                <p className="pb-0 mb-1">
                  <strong>Nombre:</strong> {user.first_name} {user.last_name}
                </p>
                <p className="pb-0 mb-2">
                  <strong>Correo electrónico:</strong> {user.email}
                </p>
              </div>
            ) : (
              <p className="text-center">No hay usuario logueado.</p>
            )}
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-md-6 mb-4">
          <div
            className="card p-4 shadow-sm border-warning"
            style={{ borderColor: "#de8a05" }}
          >
            <h2 className="card-title text-center">Datos de la Sala</h2>
            {room ? (
              <div className="card-body">
                <p>
                  <strong>Nombre de la Sala:</strong> {room.name}
                </p>
                <p>
                  <strong>Precio Por Hora:</strong> {room.price}
                </p>
                <p>
                  <strong>Capacidad:</strong> {room.people}
                </p>
                <p>
                  <strong>Detalle:</strong> {room.description}
                </p>
                <p>
                  <strong>Rango horario:</strong> {booking.startTime}:00 am -{" "}
                  {booking.endTime}:00 pm
                </p>
              </div>
            ) : (
              <p className="text-center">No hay datos de la sala.</p>
            )}
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card p-4 shadow-sm border-warning"
            style={{ borderColor: "#de8a05" }}
          >
            <h2 className="card-title text-center">Datos de la Reserva</h2>
            <div className="card-body">
              <p>
                <strong>Total:</strong> ${calculateTotalCost()}
              </p>
              <div className="form-group">
                <label htmlFor="paymentMethod">
                  <p>Método de Pago:</p>
                </label>
                <select
                  id="paymentMethod"
                  className="form-control mt-2"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="Tarjeta Credito">Tarjeta de Crédito</option>
                  <option value="Tarjeta Debito">Tarjeta de Débito</option>
                  <option value="Efectivo">Efectivo</option>
                </select>
                <p className="mt-3">
                  <strong>
                    El Total de la reserva será abonado al ingresar a la Sala!
                  </strong>
                </p>
                <button onClick={handleSubmit} className="btn-confirm">
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
