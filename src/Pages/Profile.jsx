import React from "react";
import { useAuth } from "../Components/Context/AuthContext";
import { Container } from "react-bootstrap";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center" style={{ width: "50%" }}>
        {user ? (
          <div>
            <h2>Perfil de Usuario</h2>
            <p>Nombre: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No hay usuario logueado.</p>
        )}
      </div>
    </Container>
  );
};

export default Profile;