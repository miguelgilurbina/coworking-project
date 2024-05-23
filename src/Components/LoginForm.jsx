import React from 'react'
import  { useState } from 'react';
import "../Styles/LoginSignUp.css"
import user_icon from "../Assets/person.png"
import email_icon from "../Assets/email.png"
import axios from 'axios';



const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='container'>
      <h2 className='head'> Login <span className='underline'></span></h2>
      
      <div className='input'>
        <label><img src={user_icon} alt="" />Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className='input'>
        <label><img src={email_icon} alt="" />Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit" className='submit-container'>Login</button>
    </form>
  );
    
}

export default LoginForm
