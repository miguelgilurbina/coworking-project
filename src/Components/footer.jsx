import React from "react";
import "../Styles/Footer.css";

import facebookLogo from "../../public/icons/Facebook.png";
import instagramLogo from "../../public/icons/Instagram.png";
import whatsappLogo from "../../public/icons/Whatsapp (3).png";
import cwLogo from "../../public/icons/cw_logo_app.png"

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <img
            src={cwLogo}
            alt="Logo de la empresa"
            className="company-logo"
          />
          <div className="d-grid">
            <p className="mb-0">Co-Working &copy; {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="social-icons">
          <a href="#">
            <img src={whatsappLogo} alt="WhatsApp" />
          </a>
          <a href="#">
            <img src={facebookLogo} alt="Facebook" />
          </a>
          <a href="#">
            <img src={instagramLogo} alt="Instagram" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
