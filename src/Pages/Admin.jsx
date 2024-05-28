import React from "react";
import "../Styles/admin.css";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaEdit, FaExclamationTriangle } from "react-icons/fa";

const Admin = () => {
  const isMobile = window.innerWidth <= 950;

  return (
    <div className="contenedorBody contenedorMobile">
      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <div className="AdminPage">
          <h1>Hi Administrator!</h1>
          <h3>What do you want to do today?</h3>
          <div className="AdminOptions pt-5">
            <Link to="/form" className="admin-option-card">
              <div className="card-icon">
                <FaPlus />
              </div>
              <div className="card-title">Add New Product</div>
            </Link>
            <Link to="/addCharacteristic" className="admin-option-card">
              <div className="card-icon">
                <FaList />
              </div>
              <div className="card-title">Add New Characteristic</div>
            </Link>
            <Link to="/editRoom" className="admin-option-card">
              <div className="card-icon">
                <FaEdit />
              </div>
              <div className="card-title">Edit Existing Room</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
