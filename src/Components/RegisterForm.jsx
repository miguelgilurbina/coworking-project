import {apiUsuario} from "../Data/axiosConfig";
import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../Styles/RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  });

  const navigate = useNavigate(); // Hook para la redirección

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "firstName") {
      const errorMessage = validateName(value, "First");
      setErrors({
        ...errors,
        firstName: errorMessage ? [errorMessage] : [],
      });
    } else if (name === "lastName") {
      const errorMessage = validateName(value, "Last");
      setErrors({
        ...errors,
        lastName: errorMessage ? [errorMessage] : [],
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

  const validateName = (name, fieldName) => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (name.length < 2) {
      return `${fieldName} name must have at least 2 characters.`;
    }
    if (!nameRegex.test(name)) {
      return `${fieldName} name can only contain letters.`;
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
    validatePassword(formData.password);
    if (Object.keys(errors).every((key) => errors[key].length === 0)) {
      try {
        console.log("Submitting Form Data:", formData); // Log the form data

        // Fetch the last user ID from the database or server
        const lastUserIdResponse = await apiUsuario.get(
          "/MOCK_DATAGET"
        );
        const lastUserId =
          lastUserIdResponse.data[lastUserIdResponse.data.length - 1].id;

        // Generate a new ID by incrementing the last ID
        const newUserId = lastUserId + 1;

        // Send the user data with the new ID
        const response = await apiUsuario.post("/MOCK_DATAPOST", {
          id: newUserId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          isAdmin: false,
        });
        console.log("Response from Server:", response.data); // Log the server response

        // Redirigir a la página de inicio
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Form submission halted due to errors.");
      setErrors({
        firstName: errors.firstName,
        lastName: errors.lastName,
        email: errors.email ? [errors.email] : [],
        password: errors.password,
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
                  <img src={user_icon} alt="user_icon" /> First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="formFirstName"
                  className="form-control form-control-lg"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ex: Juan"
                  required
                />
              </div>

              <div className="error-container">
                {errors.firstName.length > 0 && (
                  <div>
                    <strong>First Name Errors:</strong>
                    {renderErrors(errors.firstName)}
                  </div>
                )}
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">
                  <img src={user_icon} alt="user_icon" /> Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="formLastName"
                  className="form-control form-control-lg"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex: Perez"
                  required
                />
              </div>

              <div className="error-container">
                {errors.lastName.length > 0 && (
                  <div>
                    <strong>Last Name Errors:</strong>
                    {renderErrors(errors.lastName)}
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