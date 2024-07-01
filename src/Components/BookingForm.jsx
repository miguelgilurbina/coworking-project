import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Context/AuthContext";
import { useBooking } from "./Context/BookingContext";
import Modal from "./Modal";
import Alert from "./Alert";
import "../Styles/Booking.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookingForm = () => {
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta Credito");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [showAlert, setShowAlert] = useState(false);
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
        setError("Error fetching data");
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

  const formatTime = (time) => {
    return time < 10 ? `0${time}:00` : `${time}:00`;
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
      startTime: formatTime(booking.startTime),
      endTime: formatTime(booking.endTime),
      paymentMethod,
      totalCost: calculateTotalCost(),
    };
    console.log("Reservation Data:", reservationData);

    try {
      // Hacer POST en reservas
      await axios.post("http://localhost:3005/reservas", reservationData);

      const selectedDate = booking.date;

      // Filtra las nuevas horas disponibles
      const newAvailability = room.availability[selectedDate].filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return (
          hour < booking.startTime ||
          (hour >= booking.endTime && time !== formatTime(booking.endTime))
        );
      });

      await axios.patch(`http://localhost:3003/data/${room.id}`, {
        availability: {
          ...room.availability,
          [selectedDate]: newAvailability,
        },
      });

      setModalContent({
        title: "Reservation confirm",
        body: "You are about to confirm your reservation and payment method. Do you wish to continue?",
      });
      setModalVisible(true);
    } catch (error) {
      setModalContent({
        title: "Error",
        body: "Error making reservation",
      });
      setModalVisible(true);
    }
  };

  const closeModal = (confirmed) => {
    setModalVisible(false);
    if (confirmed) {
      setShowAlert(true);
    }
  };

  return (
    <div
      className="contenedorBody d-flex flex-column justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="containerButton">
        <Link to="/selectDate" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">Reservation details</h2>
      {modalVisible && (
        <Modal
          title={modalContent.title}
          body={modalContent.body}
          onClose={() => closeModal(false)}
          onConfirm={() => closeModal(true)}
        />
      )}
      <div className="row mb-4 w-100">
        <div className="col-12">
          <div
            className="card p-3 shadow-sm border-warning"
            style={{ borderColor: "#de8a05" }}
          >
            <h2 className="card-title text-center">User data</h2>
            {user ? (
              <div>
                <p className="pb-0 mb-1">
                  <strong>Name:</strong> {user.first_name} {user.last_name}
                </p>
                <p className="pb-0 mb-2">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            ) : (
              <p className="text-center">No logged in user found.</p>
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
            <h2 className="card-title text-center">Room Data</h2>
            {room ? (
              <div className="card-body">
                <p>
                  <strong>Room Name:</strong> {room.name}
                </p>
                <p>
                  <strong>Price Per Hour:</strong> {room.price}
                </p>
                <p>
                  <strong>Capacity:</strong> {room.people}
                </p>
                <p>
                  <strong>Description:</strong> {room.description}
                </p>
                <p className="mb-0">
                  <strong>Time:</strong> {formatTime(booking.startTime)} -{" "}
                  {formatTime(booking.endTime)}
                </p>
              </div>
            ) : (
              <p className="text-center">There is no room information.</p>
            )}
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card p-4 shadow-sm border-warning"
            style={{ borderColor: "#de8a05" }}
          >
            <h2 className="card-title text-center">Reservation data</h2>
            <div className="card-body">
              <p>
                <strong>Total:</strong> ${calculateTotalCost()}
              </p>
              <div className="form-group">
                <label htmlFor="paymentMethod">
                  <p className="mb-0">Payment method:</p>
                </label>
                <select
                  id="paymentMethod"
                  className="form-control mt-2"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="Tarjeta Credito">Credit card</option>
                  <option value="Tarjeta Debito">Debit card</option>
                  <option value="Efectivo">Cash</option>
                </select>
                <p className="mt-3">
                  <strong>
                    The total of the reservation will be paid upon entering the
                    room!{" "}
                  </strong>
                </p>
                <button onClick={handleSubmit} className="btn-confirm">
                  Confirm reservation{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          type="success"
          message="Confirmed reservation. Thank you for your reservation!"
        />
      )}
    </div>
  );
};

export default BookingForm;
