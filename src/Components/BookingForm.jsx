import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './Context/AuthContext';
import { useBooking } from './Context/BookingContext';

const BookingForm = () => {
    const [error, setError] = useState("");
    const [room, setRoom] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("Tarjeta Credito");
    const { user } = useAuth();
    const { booking } = useBooking();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3003/data");
                console.log("API Response:", response.data);

                const dataArray = response.data || [];
                console.log("Categories Array:", dataArray);

                const roomData = dataArray.find(item => item.id === "1");
                if (roomData) {
                    console.log("Room Data:", roomData);
                    setRoom(roomData);
                } else {
                    console.log("No room found with id 1");
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
            alert("Faltan datos del usuario o de la sala");
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
            totalCost: calculateTotalCost()
        };

        try {
            const response = await axios.post("http://localhost:3005/reservas", reservationData);
            console.log("Reserva realizada:", response.data);
            alert("Reserva realizada con éxito");
        } catch (error) {
            console.error("Error realizando la reserva:", error);
            alert("Error realizando la reserva");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="user-profile-container text-center p-4 border shadow-sm rounded">
                        <h2>Datos del Usuario</h2>
                        {user ? (
                            <div className="user-details mt-4">
                                <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                                <p><strong>Correo electrónico:</strong> {user.email}</p>
                            </div>
                        ) : (
                            <p>No hay usuario logueado.</p>
                        )}
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="user-profile-container text-center p-4 border shadow-sm rounded">
                        <h2>Datos de la Sala</h2>
                        {room ? (
                            <div className="room-details mt-4">
                                <p><strong>Nombre de la Sala:</strong> {room.name}</p>
                                <p><strong>Precio Por Hora:</strong> {room.price}</p>
                                <p><strong>Capacidad:</strong> {room.people}</p>
                                <p><strong>Detalle:</strong> {room.description}</p>
                                <p><strong>Rango horario:</strong> {booking.startTime}:00am - {booking.endTime}:00pm</p>
                            </div>
                        ) : (
                            <p>No hay datos de la sala.</p>
                        )}
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="user-profile-container text-center p-4 border shadow-sm rounded">
                        <h2>Datos de la Reserva</h2>
                        <p><strong>Total:</strong> ${calculateTotalCost()}</p>
                        <div className="form-group mt-4">
                            <label htmlFor="paymentMethod"><strong>Método de Pago:</strong></label>
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
                            <p><strong>El Total de la reserva será abonado al ingresar a la Sala!</strong></p>
                            <button onClick={handleSubmit} className="btn btn-primary">Confirmar Reserva</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;