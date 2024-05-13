import React from 'react';
import "../Styles/header.css"

class Header extends React.Component {
    render() {
      return (
        <header className="header">
          {/* Bloque izquierdo con logo y lema */}
          <div className="left-block">
            <a href="../Pages/Home.jsx" className="logo">
              <img src="../../public/icons/cw_logo_app.png" alt="Logo de la empresa" className="logo-img" />
              <span className="coworking">Co-Working</span>
            </a>
            <span className="lema">Donde los sueños se codean</span>
          </div>
  
        {/* Bloque derecho con botones */} 
        <div className="right-block">
          {/*<button className="button">Home</button>
          <button className="button">Reserve a Place</button>
          <button className="button">All Places</button>*/} 
          <button className="button">Create Account</button>
          <button className="button">Login</button>
        </div>
        
      </header>
    );
  }
  
}

export default Header;