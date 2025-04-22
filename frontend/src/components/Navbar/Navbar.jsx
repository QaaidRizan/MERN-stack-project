import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { StoreContext } from "../../Context/StoreContext";
import { ThemeContext } from "../../Context/ThemeContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home"); // Default to home instead of menu
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Set active menu item based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setMenu("home");
    }
  }, [location]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setMenu("home")}>
        <img src={assets.iandi_logo} alt="I & I Autos Logo" className="logo-img" />
        <span className="logo-text">I & I Autos</span>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#top-cars"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top-cars');
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Top Cars
        </a>
        <a
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('footer');
            setMenu("contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="search-icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
          </Link>
        </div>
      
        <SignedOut>
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;