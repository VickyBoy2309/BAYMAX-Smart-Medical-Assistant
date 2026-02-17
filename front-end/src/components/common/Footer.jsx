import React from "react";
import "../../styles/common/Footer.css";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-box">B</div>
            <span>BAYMAX</span>
          </div>

          <p>
            Your trusted healthcare partner, providing comprehensive
            medical services at your fingertips.
          </p>

          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>🐦</span>
            <span>📸</span>
          </div>
        </div>

        {/* COMPANY */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li>Find Doctors</li>
            <li>Book Lab Tests</li>
            <li>Order Medicines</li>
            <li>Health Plans</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Feedback</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h4>Contact</h4>
          <ul className="contact-info">
            <li><Phone size={16} /> +91 1800-XXX-XXXX</li>
            <li><Mail size={16} /> support@baymaxhealth.com</li>
            <li><MapPin size={16} /> Mumbai, Maharashtra, India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 BAYMAX. All rights reserved.</p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Disclaimer</span>
          <span>Refund Policy</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;