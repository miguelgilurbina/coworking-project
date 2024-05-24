import React from 'react';
import "../Styles/header.css"
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="d-flex p-2">
          <a href="../Pages/Home.jsx" className="logo">
            <img
              src="../../public/icons/cw_logo_app.png"
              alt="Logo de la empresa"
              className="logo-img"
            />
            <div className="d-grid">
              <span className="coworking">Co-Working</span>
              <span className="lema">Donde los sueños se codifican</span>
            </div>
          </a>
        </div>

        <div className="right-block">
          {/* TODO: Se comentan botones por posible uso en proximo spring, hay que realizar menu hamburguesa */}
          {/*<button className="button">Home</button>
          <button className="button">Reserve a Place</button>
          <button className="button">All Places</button>*/} 
          <Link to="/register" className='button'>Create Account</Link>
          <Link to="/login" className='button'>Login</Link>
          <Link to="/admin" className='button'>Admin</Link>
        </div>
      </header>
    );
  }
}

export default Header;
