import React from "react";
import "../Styles/admin.css";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaEdit, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../Components/Context/AuthContext";

const Admin = () => {
  const isMobile = window.innerWidth <= 950;
  // TODO: implementar cuando este logueado
  const { user } = useAuth();

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
          {user ? (
            <>
              <h2>Hi {user.first_name}!</h2>
              <h4>What do you want to do today?</h4>
            </>
          ) : (
            <>
              <h2>Hi Administrator!</h2>
              <h4>What do you want to do today?</h4>
            </>
          )} 
          <div className="AdminOptions pt-5">
            <Link to="/form" className="admin-option-card">
              <div className="card-icon">
                <FaPlus />
              </div>
              <div className="card-title">Add New Room</div>
            </Link>
            <Link to="/addCharacteristic" className="admin-option-card">
              <div className="card-icon">
                <FaList />
              </div>
              <div className="card-title">List & Add New Characteristic</div>
            </Link>
            <Link to="/editRoom" className="admin-option-card">
              <div className="card-icon">
                <FaEdit />
              </div>
              <div className="card-title">List & Edit Room</div>
            </Link>
            <Link to="/userList" className="admin-option-card">
              <div className="card-icon">
                <FaList />
              </div>
              <div className="card-title">Users List </div>
            </Link>
            <Link to="/addCategory" className="admin-option-card">
              <div className="card-icon">
                <FaEdit />
              </div>
              <div className="card-title">List & Add New Category</div>
            </Link>
            {/* <Link to="/categoryList" className="admin-option-card">
              <div className="card-icon">
                <FaList />
              </div>
              <div className="card-title">Category List</div>
            </Link> */}
            {/* <Link to="/producto" className="admin-option-card">
              <div className="card-icon">
                <FaList />
              </div>
              <div className="card-title">Product List</div>
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
