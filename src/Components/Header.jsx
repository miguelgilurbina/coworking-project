import React from "react";
import "../Styles/header.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Avatar from "./Avatar";
import { useState } from "react";

const Header = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <header className="header">
      <div className="d-flex p-2">
        <a href="../Pages/Home.jsx" className="logo">
          <img
            src="../../public/icons/cw_logo_app.png"
            alt="Logo de la empresa"
            className="logo-img"
          />
          <div className="d-grid">
            <span className="coworking">Co-Working</span>
            <span className="lema">Where Dreams Are Codified</span>
          </div>
        </a>
      </div>

      <div className="right-block">
        {/* TODO: Se comentan botones por posible uso en proximo spring, hay que realizar menu hamburguesa */}
        {/*<button className="button">Home</button>
          <button className="button">Reserve a Place</button>
          <button className="button">All Places</button>*/}
        {user ? (
          <div className="logged-in-section">
            <Link to="/admin" className="button link-flex">
              Admin
            </Link>
            <div>
              <div
                className="user-initials-container"
                onClick={toggleSidebar}
                style={{ cursor: "pointer" }}
              >
                {getInitials(user.name)}
              </div>
              <Link to="/" className="logout-link">
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
