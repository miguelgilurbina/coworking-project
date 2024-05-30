import axios from "axios";
import React, { useState } from "react";
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

    if (name === "password") {
      validatePassword(value);
    } else if (name === "email") {
      const errorMessage = validateEmail(value);
      setErrors({
        ...errors,
        email: errorMessage ? [errorMessage] : [],
      });
    }
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
    validatePassword(formData.password);

    if (Object.keys(errors).every(key => errors[key].length === 0)) {
      try {
        const response = await axios.post('https://reqres.in/api/users', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  const renderErrors = (errorMessages) => {
    return errorMessages.map((message, index) => (
      <div key={index} className="error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-exclamation-lg"
          viewBox="0 0 16 16"
          style={{ marginRight: "5px" }}
        >
          <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
        </svg>
        {message}
      </div>
    ));
  };

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

              <div data-mdb-input-init className="form-outline mb-4">
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

              <div data-mdb-input-init className="form-outline mb-4">
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

              <div data-mdb-input-init className="form-outline mb-4">
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
                  onClick={handleSubmit}
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-warning btn-lg btn-block mt-2"
                  type="button"
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
