import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>About I & I Autos</h3>
          <p>
            We are a premier car dealership providing the best automotive
            experiences. Our mission is to deliver quality vehicles and exceptional
            service to our customers.
          </p>
          <div className="footer-social">
            <a href="https://web.facebook.com/profile.php?id=61563936605070" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#explore-menu">Our Vehicles</a></li>
            <li><a href="#footer">Contact Us</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Financing Options</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>Email: info@i&iautos.com</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <p>Phone: +94 75-262-2860</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Address: 11b kawudan broad way, Dehiwala</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-clock"></i>
            <p>Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} I & I Autos. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Terms of Service</a>
          <span className="separator">|</span>
          <a href="#">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;