import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const Avatar = ({ isOpen }) => {
  const { user } = useAuth();

  return (
    <nav
      id="sidebarMenu"
      className={`collapse d-lg-block sidebar collapse bg-white ${
        isOpen ? "show" : ""
      }`}
      style={{ right: 0, left: "auto", position: "fixed", top: "60px" }}
    >
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <div className="list-group-item py-2">
            {user && (
              <div>
                <span style={{ fontWeight: "bold", color: "#de8a05" }}>
                  Welcome
                </span>
                , <span style={{ fontWeight: "bold" }}>{user.name}</span>
              </div>
            )}
          </div>


          <Link
            to="/"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
            <span style={{ marginLeft: "10px" }}>Home</span>
          </Link>
          <Link
            to="/"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <span style={{ marginLeft: "10px" }}>My account</span>
          </Link>

          <Link
            to="/"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            <span style={{ marginLeft: "10px" }}>Log out</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Avatar;
