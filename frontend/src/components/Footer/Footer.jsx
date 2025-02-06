import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>About Us</h3>
          <p>
            We are a leading food delivery service providing the best culinary
            experiences. Our mission is to deliver delicious meals to your
            doorstep.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@fooddelivery.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Foodie Lane, Flavor Town, FT 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Food Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;