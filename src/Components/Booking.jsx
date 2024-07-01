import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useBooking } from "./Context/BookingContext";
import Modal from "./Modal";
import Alert from "./Alert";
import "../Styles/Booking.css";
import { FaArrowLeft, FaCalendarCheck } from "react-icons/fa";
import "../Styles/Form.css";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availability, setAvailability] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const { booking, setBooking } = useBooking();
  const roomId = "1"; // ID por default, se tiene que modificar cuando se implemente el ir a detalle por ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/data");
        const room = response.data.find((room) => room.id === roomId);
        setAvailability(room.availability);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    if (selectedDate && availability[selectedDate]) {
      setAvailableTimes(availability[selectedDate]);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, availability]);

  const handleHoraInicioChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setBooking((prev) => ({ ...prev, startTime: value }));
  };

  const handleHoraFinChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setBooking((prev) => ({ ...prev, endTime: value }));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setBooking((prev) => ({ ...prev, date: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalMessage(
      <div>
        <p>
          You have selected the day {formatDate(selectedDate)}, in the time from{" "}
          {formatTime(booking.startTime)} to {formatTime(booking.endTime)}. Do
          you wish to continue?
        </p>
        <p>
          <strong>Note:</strong> Your reservation will become effective when you
          select the payment method that will be activated next.
        </p>
      </div>
    );
    setModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatTime = (hour) => {
    if (hour < 12) {
      return `${hour}:00 am`;
    } else if (hour === 12) {
      return `12:00 pm`;
    } else {
      return `${hour - 12}:00 pm`;
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  const renderStartTimeOptions = () => {
    const times = [];
    times.push(
      <option key="default" value="">
        Select time
      </option>
    );

    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour < 10 ? "0" : ""}${hour}:00`;
      times.push(
        <option
          key={hour}
          value={hour}
          disabled={!availableTimes.includes(timeString)}
        >
          {timeString}
        </option>
      );
    }
    return times;
  };

  const renderEndTimeOptions = () => {
    const times = [];
    times.push(
      <option key="default" value="">
        Select time
      </option>
    );

    if (booking.startTime) {
      let disableFurther = false;
      for (let hour = 9; hour <= 17; hour++) {
        const timeString = `${hour < 10 ? "0" : ""}${hour}:00`;

        if (hour <= booking.startTime) {
          times.push(
            <option key={hour} value={hour} disabled>
              {timeString}
            </option>
          );
        } else {
          if (!availableTimes.includes(timeString) || disableFurther) {
            disableFurther = true;
            times.push(
              <option key={hour} value={hour} disabled>
                {timeString}
              </option>
            );
          } else {
            times.push(
              <option key={hour} value={hour}>
                {timeString}
              </option>
            );
          }
        }
      }
    }
    return times;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmReservation = () => {
    setShowAlert(true);
    setReservationConfirmed(true);
    setModalOpen(false);
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/detail" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">Select a date and time</h2>
      <div className="centerContaniner">
        <div className="form-column border-custom">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="fecha">Date:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                min={getCurrentDate()}
                max={getMaxDate()}
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>
            <p>
              {" "}
              <FaCalendarCheck className="icon-space" /> You can only schedule a
              room 1 month in advance.
            </p>
            <div className="form-group">
              <label htmlFor="horaInicio">Start time:</label>
              <select
                id="horaInicio"
                name="horaInicio"
                value={booking.startTime || ""}
                onChange={handleHoraInicioChange}
                required
              >
                {renderStartTimeOptions()}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="horaFin">End time:</label>
              <select
                id="horaFin"
                name="horaFin"
                value={booking.endTime || ""}
                onChange={handleHoraFinChange}
                required
              >
                {renderEndTimeOptions()}
              </select>
            </div>
            <div className="containerButton centerContainer">
              <button type="submit" className="btn-confirm">
                Confirm Schedule
              </button>
              {reservationConfirmed && (
                <Link to="/reserveRoom">
                  <button
                    className="btn-confirm"
                    style={{ marginLeft: "45px", backgroundColor: "#de8a05" }}
                  >
                    Go to payment methods
                  </button>
                </Link>
              )}
            </div>
          </form>
          <div className="selected-range">
            <strong>Time of the reservation:</strong>
            <p>
              {selectedDate
                ? `Date: ${formatDate(selectedDate)}, Time: ${formatTime(
                    booking.startTime
                  )} - ${formatTime(booking.endTime)}`
                : ""}
            </p>
          </div>
          {showAlert && (
            <Alert
              type="success"
              message={
                <span>
                  ¡Reservation confirmed for{" "}
                  <strong>
                    {formatDate(selectedDate)}, from{" "}
                    {formatTime(booking.startTime)} to{" "}
                    {formatTime(booking.endTime)}
                  </strong>
                  !
                </span>
              }
            />
          )}
        </div>
      </div>
      {modalOpen && (
        <Modal
          title="Schedule Confirmation"
          body={modalMessage}
          onClose={closeModal}
          onConfirm={confirmReservation}
        />
      )}
    </div>
  );
};

export default Booking;
