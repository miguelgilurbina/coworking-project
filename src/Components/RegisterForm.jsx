import axios from 'axios';
import React, { useState } from 'react';
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import "../Styles/RegisterForm.css"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: [],
    email: [],
    password: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    let errorMessages = [];

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUpperCase) {
      errorMessages.push('Password must have at least one uppercase letter.');
    }
    if (!hasLowerCase) {
      errorMessages.push('Password must have at least one lowercase letter.');
    }
    if (!hasNumber) {
      errorMessages.push('Password must have at least one number.');
    }

    setErrors({
      ...errors,
      password: errorMessages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePassword(formData.password);
    if (Object.keys(errors).every(key => errors[key].length === 0)) {
      try {
        const response = await axios.post('http://localhost:8080/api/register', formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderErrors = (errorMessages) => {
    return errorMessages.map((message, index) => (
      <div key={index} className="error">
        {message}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
      <h2 className='head'> Register <span className='underline'></span></h2>
      <div className='input'>
        <label><img src={user_icon} alt=""/>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className='input'>
        <label><img src={email_icon} alt=""/>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className='input'>
        <label><img src={password_icon} alt=""/>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div className="error-container">
        {errors.password.length > 0 && (
          <div className="password-errors">
            <strong>Password Errors:</strong>
            {renderErrors(errors.password)}
          </div>
        )}
      </div>
      <button type="submit" className='submit-container'>Register</button>
    </form>
  );
};

export default RegisterForm;