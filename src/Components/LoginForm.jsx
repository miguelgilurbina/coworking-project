import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { FaExclamationCircle } from "react-icons/fa";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080//login",
        formData
      );
      login(response.data.user);
      navigate("/home");
      console.log(response.data);
    } catch (error) {
      setError("Incorrect email or password. Please try again");
      console.error(error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     // Llamar a la función de inicio de sesión del contexto de autenticación
  //     await login(formData);
  //     // Redirigir al usuario después de iniciar sesión
  //     navigate("/home");
  //   } catch (error) {
  //     // Manejar errores de inicio de sesión
  //     setError("Invalid email or password.");
  //   }
  // };

  return (
    <div className="card" style={{ borderRadius: "1rem" }}>
      <div className="d-flex">
        <div className="col-md-6 col-lg-5 d-none d-md-block">
          <img
            src="/public/images/img_aleatory_4.png"
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
                Sign into your account
              </h5>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">
                  <img src={user_icon} alt="email_icon" /> Email address
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
                  placeholder="********"
                />
              </div>

              {error && (
                <div className="error-message" style={{ color: "red" }}>
                  <FaExclamationCircle
                    style={{ marginRight: "8px", marginBottom: "4px" }}
                  />
                  {error}
                </div>
              )}

              <div className="pt-1 mb-4">
                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-warning btn-lg btn-block mt-2"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/login",
//         formData
//       );
//       login(response.data.user);
//       navigate("/home");
//       console.log(response.data);
//     } catch (error) {
//       setError("Incorrect email or password. Please try again");
//       console.error(error);
//     }
//   };

  // TODO: codigo temporal para probar el login