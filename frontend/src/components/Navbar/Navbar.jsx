import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { StoreContext } from "../../Context/StoreContext";
import { ThemeContext } from "../../Context/ThemeContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Set active menu item based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setMenu("home");
    }
  }, [location]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && !event.target.closest('.search-container')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      try {
        // Using the local endpoint
        const response = await axios.get(`https://splendid-upliftment-production-1cb8.up.railway.app/api/products/search?q=${query}`);
        if (response.data.success) {
          setSearchResults(response.data.products);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${searchQuery}`);
      setShowSearch(false);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/place-order/${id}`);
    setShowSearch(false);
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
          onClick={e => {
            e.preventDefault();
            if (location.pathname !== "/") {
              navigate("/", { state: { scrollTo: "footer" } });
              setMenu("contact-us");
            } else {
              const el = document.getElementById("footer");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              setMenu("contact-us");
            }
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="search-wrapper">
          <img 
            src={assets.search_icon} 
            alt="Search" 
            className="search-icon" 
            onClick={handleSearchClick}
          />
          {showSearch && (
            <div className="search-container">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <button type="submit">
                  <img src={assets.search_icon} alt="Search" />
                </button>
              </form>
              
              {isSearching && (
                <div className="search-loading">
                  <div className="search-spinner"></div>
                  <p>Searching...</p>
                </div>
              )}
              
              {!isSearching && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.slice(0, 5).map(vehicle => (
                    <div 
                      key={vehicle.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(vehicle.id)}
                    >
                      <div className="search-result-image">
                        <img 
                          src={vehicle.images && vehicle.images.length > 0 
                            ? vehicle.images[0] 
                            : "https://via.placeholder.com/50x50?text=No+Image"
                          } 
                          alt={vehicle.name}
                        />
                      </div>
                      <div className="search-result-info">
                        <h4>{vehicle.name}</h4>
                        <p>{new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'LKR',
                          maximumFractionDigits: 0
                        }).format(vehicle.price)}M</p>
                      </div>
                    </div>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="see-all-results" onClick={handleSearchSubmit}>
                      See all {searchResults.length} results
                    </div>
                  )}
                </div>
              )}
              
              {!isSearching && searchQuery.length > 2 && searchResults.length === 0 && (
                <div className="no-search-results">
                  <p>No vehicles found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
        
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