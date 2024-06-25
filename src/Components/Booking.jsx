import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from './Context/BookingContext';
import "../Styles/Booking.css";
import { FaArrowLeft } from "react-icons/fa";
import "../Styles/Form.css";

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const { booking, setBooking } = useBooking();
    
    const handleHoraInicioChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 9 && value < booking.endTime) {
            setBooking(prev => ({ ...prev, startTime: value }));
        }
    };

    const handleHoraFinChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > booking.startTime && value <= 17) {
            setBooking(prev => ({ ...prev, endTime: value }));
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setBooking(prev => ({ ...prev, date: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Rango horario seleccionado: ${booking.startTime}:00am - ${booking.endTime}:00pm`);
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
    
        // Ajustar el formato para que tenga siempre dos dígitos
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
    
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="contenedorBody">
            <div className="containerButton">
                <Link to="/admin" className="genericButton link-flex">
                    <FaArrowLeft className="iconSpace" /> Go back
                </Link>
            </div>
            <h2 className="mb-4">Selecciona una fecha y un rango horario</h2>
            <div className="centerContaniner">
            <div className="form-column border-custom">
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            min={getCurrentDate()}
                            value={selectedDate}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horaInicio">Hora de inicio:</label>
                        <input
                            type="number"
                            id="horaInicio"
                            name="horaInicio"
                            min={9}
                            max={booking.endTime - 1}
                            value={booking.startTime}
                            onChange={handleHoraInicioChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horaFin">Hora de fin:</label>
                        <input
                            type="number"
                            id="horaFin"
                            name="horaFin"
                            min={booking.startTime + 1}
                            max={17}
                            value={booking.endTime}
                            onChange={handleHoraFinChange}
                            required
                        />
                    </div>
                    <div className="containerButton centerContainer">
                        <button type="submit" className="btn-confirm">
                            Confirmar Rango Horario
                        </button>
                    </div>
                </form>
                <div className="selected-range">
                    <strong>Rango horario seleccionado:</strong>
                    <p>{selectedDate ? `Fecha: ${selectedDate},` : ''} Rango horario: {booking.startTime}:00am - {booking.endTime}:00pm</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Booking;
