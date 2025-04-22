import React, { useContext } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const CarItem = ({ id, name, description, price, image, year, mileage, transmission, fuelType }) => {
  const { theme } = useContext(ThemeContext);
  const maxDescriptionLength = 80; // Increased for car descriptions
  const truncatedDescription = description.length > maxDescriptionLength 
    ? `${description.substring(0, maxDescriptionLength)}...` 
    : description;

  // Format price with commas for thousands
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0
  }).format(price);

  // Format mileage with commas
  const formattedMileage = mileage ? new Intl.NumberFormat('en-US').format(mileage) : 'N/A';

  return (
    <div className={`car-item theme-${theme}`}>
      <div className="car-image-container">
        <img src={image} alt={name} className="car-item-image" />
        <div className="car-price-tag">{formattedPrice}</div>
        {year && <div className="car-year-badge">{year}</div>}
      </div>
      <div className="car-item-info">
        <h3 className="car-item-name">{name}</h3>
        <p className="car-item-description">{truncatedDescription}</p>
        
        <div className="car-specs">
          {mileage && (
            <div className="car-spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>{formattedMileage} miles</span>
            </div>
          )}
          
          {transmission && (
            <div className="car-spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M12 12h.01"></path>
              </svg>
              <span>{transmission}</span>
            </div>
          )}
          
          {fuelType && (
            <div className="car-spec-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.5 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
              </svg>
              <span>{fuelType}</span>
            </div>
          )}
        </div>
        
        <div className="car-features">
          <span className="car-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.5 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
            Auto
          </span>
          <span className="car-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Secure
          </span>
          <span className="car-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Verified
          </span>
        </div>
        <Link to={`/place-order/${id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarItem;