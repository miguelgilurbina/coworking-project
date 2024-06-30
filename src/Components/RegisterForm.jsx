import React, { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../Styles/RegisterForm.css";
import api from "../api/axiosconfig";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "usuario",
  });

  const [errors, setErrors] = useState({
    nombre: [],
    apellido: [],
    email: [],
    password: [],
    server: [],
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = [];
    switch (name) {
      case "nombre":
      case "apellido":
        if (value.length < 2) {
          fieldErrors.push(`${name} must have at least 2 characters.`);
        }
        if (!/^[a-zA-Z]+$/.test(value)) {
          fieldErrors.push(`${name} can only contain letters.`);
        }
        break;
      case "email":
        if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) {
          fieldErrors.push("Invalid email format.");
        }
        break;
      case "password":
        if (!/[A-Z]/.test(value)) {
          fieldErrors.push("Password must have at least one uppercase letter.");
        }
        if (!/[a-z]/.test(value)) {
          fieldErrors.push("Password must have at least one lowercase letter.");
        }
        if (!/\d/.test(value)) {
          fieldErrors.push("Password must have at least one number.");
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).every((arr) => arr.length === 0)) {
      try {
        await api.post("/usuarios/registrar", formData);
        await login({ username: formData.email, password: formData.password });
        navigate("/welcome");
      } catch (error) {
        console.error("Error during registration:", error);
        setErrors((prev) => ({
          ...prev,
          server: [error.response?.data?.message || "An error occurred during registration."],
        }));
      }
      console.log(data);
    }
  };

  const renderErrors = (errorMessages) => {
    return errorMessages.map((message, index) => (
      <div key={index} className="error">
        <FaExclamationCircle size={16} style={{ marginRight: "5px", color: "red" }} />
        {message}
      </div>
    ));
  };

  const hasErrors = Object.values(errors).some((arr) => arr.length > 0);

  return (
    <div className="card" style={{ borderRadius: "1rem" }}>
      <div className="d-flex">
        <div className="col-md-6 col-lg-5 d-none d-md-block">
          <img
            src="/public/images/img-category_2.jpg"
            alt="login form"
            className="img-fluid"
            style={{ borderRadius: "1rem 0 0 1rem" }}
          />
        </div>
        <div className="p-3 container">
          <div className="mt-5">
            <form onSubmit={handleSubmit} className="reg">
              <div className="d-flex align-items-center mb-3 pb-1">
                <img
                  src="../../public/icons/cw_logo_app.png"
                  alt="Logo de la empresa"
                  style={{ filter: "contrast(0.8)" }}
                />
                <span className="h2 fw-bold mb-0">Co-Working</span>
              </div>
              <h5
                className="fw-normal mb-3 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                The Co-Working experience starts here
              </h5>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label">
                  <img src={user_icon} alt="user_icon" /> First Name
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="formnombre"
                  className="form-control form-control-lg"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ex: Juan"
                  required
                />
              </div>

              <div className="error-container">
                {errors.nombre.length > 0 && (
                  <div>
                    <strong>First Name Errors:</strong>
                    {renderErrors(errors.nombre)}
                  </div>
                )}
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">
                  <img src={user_icon} alt="user_icon" /> Last Name
                </label>
                <input
                  type="text"
                  name="apellido"
                  id="formapellido"
                  className="form-control form-control-lg"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ex: Perez"
                  required
                />
              </div>

              <div className="error-container">
                {errors.apellido.length > 0 && (
                  <div>
                    <strong>Last Name Errors:</strong>
                    {renderErrors(errors.apellido)}
                  </div>
                )}
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label">
                  <img src={email_icon} alt="email_icon" /> Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="formEmail"
                  className="form-control form-control-lg"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: example@email.com"
                  required
                />
              </div>

              <div className="error-container">
                {errors.email.length > 0 && (
                  <div>
                    <strong>Email Errors:</strong>
                    {renderErrors(errors.email)}
                  </div>
                )}
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label">
                  <img src={password_icon} alt="password_icon" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="formPassword"
                  className="form-control form-control-lg"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="1 uppercase letter, 1 lowercase letter, 1 number"
                  required
                />
              </div>

              <div className="error-container">
                {errors.password.length > 0 && (
                  <div>
                    <strong>Password Errors:</strong>
                    {renderErrors(errors.password)}
                  </div>
                )}
              </div>
              <div className="pt-1 mb-4">
                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-warning btn-lg btn-block mt-2"
                  type="submit"
                  disabled={hasErrors}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
