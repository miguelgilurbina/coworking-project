import React, { useState } from "react";
import "../Styles/header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";
import Avatar from "./Avatar";

const Header = () => {
  const { usuario, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (usuario) => {
    if (!usuario || !usuario.nombre || !usuario.apellido) return "";
    const firstInitial = usuario.nombre[0];
    const lastInitial = usuario.apellido[0];
    return (firstInitial + lastInitial).toUpperCase();
  };

  return (

    //Parte Izquierda del Header
    <header className="header">
      <div className="d-flex p-2">
        <Link to="/home" className="logo">
          <img
            src="../../public/icons/cw_logo_app.png"
            alt="Logo de la empresa"
            className="logo-img"
          />
          <div className="d-grid">
            <span className="coworking">Co-Working</span>
            <span className="lema">Where Dreams Are Codified</span>
          </div>
        </Link>
      </div>

      <div className="right-block">
        {usuario && (
          <Link to={"/favorites"} className="button link-flex">
            Favorites
          </Link>
        )}
        {usuario ? (
          <div className="logged-in-section">
            {usuario.rol === "admin" && (
              <Link to="/admin" className="button link-flex">
                Admin
              </Link>
            )}
            <div>
              <Link to="/profile" className="user-profile-link">
                <div
                  className="user-initials-container"
                  onClick={toggleSidebar}
                  style={{ cursor: "pointer" }}
                >
                  {getInitials(usuario)}
                </div>
              </Link>
              <Link to="/" className="logout-link" onClick={logout}>
                Log out
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/register" className="button link-flex">
              Create Account
            </Link>
            <Link to="/login" className="button link-flex">
              Login
            </Link>
          </>
        )}
      </div>
      {/* revisar pq no se habilita en desktop */}
      {/* <Avatar isOpen={sidebarOpen} /> */}
    </header>
  );
};

export default Header;