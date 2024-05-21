import React from 'react'
import  { useState } from 'react';
import "../Styles/LoginSignUp.css"
import user_icon from "../Assets/person.png"
import email_icon from "../Assets/email.png"
import password_icon from "../Assets/password.png"



const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState("Sign Up")
  
    const handleLogin = () => {
      // Aquí  implementar la lógica para autenticar
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
    };
  
    return (
      <div className='container'>
        <div className='head'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action === "Login" ? <div></div> :  <div className='input'>
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Name' value={username}
          onChange={(e) => setUsername(e.target.value)} />
          </div> }
         
          <div className='input'>
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email'  />
          </div>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' value={password}
          onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        {action ==="Sign Up" ? <div></div> : <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>}
        
        <div className="submit-container">
          <button className={action === "Login" ? "submit grey" : "submit"}  onClick={()=>setAction("Sign Up")} >Sign Up</button>
          <button className={action === "Sign Up" ? "submit grey" : "submit"} onClick={()=>setAction("Login")}>Login</button>

        </div>
      {/*  { <h1>Iniciar Sesión</h1>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Ingresar</button> */}
      </div>
    );
}

export default LoginForm
