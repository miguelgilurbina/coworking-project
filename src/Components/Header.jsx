import React from "react";
import "../Styles/header.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import cwLogo from "../../public/icons/cw_logo_app.png"
import Avatar from "./Avatar";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth(); // Obtén la función logout del contexto de autenticación
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (user) => {
    if (!user || !user.first_name || !user.last_name) return "";
    const firstInitial = user.first_name[0];
    const lastInitial = user.last_name[0];
    return (firstInitial + lastInitial).toUpperCase();
  };

  return (
    <header className="header">
      <div className="d-flex p-2">
        <Link to="/home" className="logo">
          <img
            src={cwLogo}
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
        {user && (
        <Link to={"/favorites"} className="button link-flex">
          Favorites
        </Link>
        )
        }
        {user ? (
          <div className="logged-in-section">
            {user.isAdmin && ( // Verifica si el usuario es administrador
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
                  {getInitials(user)}
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
