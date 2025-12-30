import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <>
      <style>
        {`
/* MAIN FOOTER BACKGROUND */
.footer-section {
  background: radial-gradient(circle at 50% 10%, #1c263c 0%, #0c0f17 80%);
  padding: 40px 20px 20px;
  color: #f5e1b7;
  font-family: "Poppins", sans-serif;
}

/* GOLD SEPARATOR LINE ON TOP */
.footer-top-line {
  width: 100%;
  height: 1px;
  background: rgba(245,225,164,0.3);
  margin-bottom: 35px;
}

/* CONTENT WRAPPER */
.footer-content {
  max-width: 1100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

/* COLUMN TITLES */
.footer-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: #f5d36c;
  margin-right:139px;
}

/* CONTACT BLOCK */
.footer-contact p {
  margin: 6px 0;
  
  opacity: 0.9;
}

/* HORIZONTAL QUICK LINKS */
.footer-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  align-items: center;
  margin-right:97px;
}

.footer-links a {
  text-decoration: none;
  color: #f5e1b7;
  transition: 0.3s;
}

.footer-links a:hover {
  color: #ffffff;
}

/* BRAND + SOCIALS */
.footer-brand {
  text-align: right;
}

.footer-brand h2 {
  font-size: 26px;
  color: #f5e1b7;
}

.social-icons {
  display: flex;
  gap: 14px;
  justify-content: flex-end;
  margin-top: 8px;
}

.social-icons svg {
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.social-icons a {
  margin-right:16px;
}

.social-icons svg:hover {
  color: #ffffff;
}

/* COPYRIGHT */
.footer-bottom {
  margin-top: 25px;
  text-align: center;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
}



/* MOBILE FIXES */
@media (max-width: 768px) {
  .footer-brand {
    text-align: left;
  }
  .social-icons {
    justify-content: flex-start;
  }
  .footer-content {
    gap: 30px;
  }
}
        `}
      </style>

      {/* HTML START */}
      <footer className="footer-section" id="footer-section">

        {/* GOLD LINE ON TOP */}
        <div className="footer-top-line"></div>

        <div className="footer-content">

          {/* CONTACT */}
          <div className="footer-contact">
            <h3 className="footer-title">Contact</h3><br/>
            <p>Email: <strong>aastha.dua2006@gmail.com</strong></p>
          </div>

          {/* QUICK LINKS HORIZONTAL */}
          <div>
            <h3 className="footer-title"><center>Quick Links</center></h3><br/>
            <div className="footer-links">
              <a href="#">Home</a>
              <a href="#">Destinations</a>
              <a href="#">Itineraries</a>
              <a href="#">Testimonials</a>
              <a href="#">Contact</a>
            </div>
          </div>

          {/* BRAND + SOCIALS */}
          <div className="footer-brand">
            <h2>VEYORA</h2>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          © 2025 Veyora. All rights reserved.
        </div>

      </footer>
    </>
  );
}

export default Footer;
