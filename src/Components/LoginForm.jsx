// LoginForm.js
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { FaExclamationCircle } from "react-icons/fa";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

const LoginForm = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div className="card" style={{ borderRadius: "1rem" }}>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
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
                            <div className="form-outline mb-4">
                                <label className="form-label">
                                    <img src={user_icon} alt="email_icon" /> Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ex: example@email.com"
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label">
                                    <img src={password_icon} alt="password_icon" /> Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    required
                                />
                            </div>
                            {errorMessage && (
                                <div className="error-message" style={{ color: "red" }}>
                                    <FaExclamationCircle
                                        style={{ marginRight: "8px", marginBottom: "4px" }}
                                    />
                                    {errorMessage}
                                </div>
                            )}
                            <div className="pt-1 mb-4">
                                <button
                                    className="btn btn-warning btn-lg btn-block mt-2"
                                    type="submit"
                                    disabled={isSigningIn}
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