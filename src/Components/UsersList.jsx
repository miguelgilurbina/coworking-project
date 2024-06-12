import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../Styles/Form.css";
import { FaArrowLeft } from "react-icons/fa";
import Alert from "./Alert";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  useEffect(() => {
    // Fetching data from the API
    axios
      .get("http://localhost:3001/usuarios")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      // Send a DELETE request to remove the user
      await axios.delete(`http://localhost:3001/usuarios/${userId}`);

      // Create a new user object with updated isAdmin status
      const newUser = {
        ...users.find((user) => user.id === userId),
        isAdmin: !isAdmin,
      };
      setShowRemoveSuccess(isAdmin);

      // Send a POST request to add the new user with updated isAdmin status
      const response = await axios.post(
        "http://localhost:3001/usuarios",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowAddSuccess(!isAdmin);

      console.log("Update response:", response.data);

      // Update local state to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return { ...user, isAdmin: !isAdmin };
          }
          return user;
        })
      );

      // Ocultar las alertas después de 4 segundos
      setTimeout(() => {
        setShowRemoveSuccess(false);
        setShowAddSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("There was an error updating the user!", error);
    }
  };

  return (
    <div className="contenedorBody">
      <div>
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go Back
        </Link>
      </div>
      <h2 className="mb-4">Users List</h2>

      <div className="container d-flex flex-column justify-content-center align-items-center ">
        <div className="card w-60" style={{ width: "600px" }}>
          <div className="card-body">
            <h1 className="card-title text-center">Registered users</h1>
            <ul className="list-group">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>
                      {user.first_name} {user.last_name}
                    </strong>{" "}
                    - {user.email}
                  </span>
                  <button
                    className={`btn btn-sm ${
                      user.isAdmin ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showRemoveSuccess && (
          <Alert
            type="success"
            message={
              <span>
                User
                <strong> REMOVED</strong> to admin successfully.
              </span>
            }
          />
        )}
        {showAddSuccess && (
          <Alert
            type="success"
            message={
              <span>
                User
                <strong> ADDED</strong> to admin successfully.
              </span>
            }
          />
        )}
      </div>
    </div>
  );
};

export default UsersList;
