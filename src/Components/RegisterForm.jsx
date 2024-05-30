import axios from "axios";
import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../Styles/RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: [],
    email: [],
    password: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "username") {
      const errorMessage = validateUsername(value);
      setErrors({
        ...errors,
        username: errorMessage ? [errorMessage] : [],
      });
    } else if (name === "email") {
      const errorMessage = validateEmail(value);
      setErrors({
        ...errors,
        email: errorMessage ? [errorMessage] : [],
      });
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z]+$/;

    if (username.length < 2) {
      return "Username must have at least 2 characters.";
    }
    if (!usernameRegex.test(username)) {
      return "Username can only contain letters.";
    }

    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    return null;
  };

  const validatePassword = (password) => {
    const validationCriteria = [
      {
        condition: /[A-Z]/,
        message: "Password must have at least one uppercase letter.",
      },
      {
        condition: /[a-z]/,
        message: "Password must have at least one lowercase letter.",
      },
      { condition: /\d/, message: "Password must have at least one number." },
    ];

    const errorMessages = validationCriteria
      .filter(({ condition }) => !condition.test(password))
      .map(({ message }) => message);

    setErrors({
      ...errors,
      password: errorMessages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (!usernameError && !emailError && passwordError.length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/register",
          formData
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors({
        username: usernameError ? [usernameError] : [],
        email: emailError ? [emailError] : [],
        password: passwordError,
      });
    }
  };

  const renderErrors = (errorMessages) => {
    return errorMessages.map((message, index) => (
      <div key={index} className="error">
        <FaExclamationCircle
          size={16}
          style={{ marginRight: "5px", color: "red" }}
        />
        {message}
      </div>
    ));
  };

  const hasErrors = Object.values(errors).some(
    (errorArray) => errorArray.length > 0
  );

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
            <form onSubmit={handleSubmit}>
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
                The Co-Working experience start here
              </h5>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label">
                  <img src={user_icon} alt="user_icon" /> Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="formUserName"
                  className="form-control form-control-lg"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ex: Juan Perez"
                />
              </div>

              <div className="error-container">
                {errors.username.length > 0 && (
                  <div className="username-errors">
                    <strong>Username Errors:</strong>
                    {renderErrors(errors.username)}
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
                />
              </div>
              
              <div className="error-container">
                {errors.email.length > 0 && (
                  <div className="email-errors">
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
                />
              </div>

              <div className="error-container">
                {errors.password.length > 0 && (
                  <div className="password-errors">
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
