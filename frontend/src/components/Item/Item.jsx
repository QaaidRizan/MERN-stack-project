import React, { useContext } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const CarItem = ({ id, name, description, price, images, year, mileage, transmission, fuelType }) => {
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

  // Get the first image from the images array or use a placeholder
  const primaryImage = images && images.length > 0 ? images[0] : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className={`car-item theme-${theme}`}>
      <div className="car-image-container">
        <img src={primaryImage} alt={name} className="car-item-image" />
        <div className="car-price-tag">{formattedPrice}</div>
        {year && <div className="car-year-badge">{year}</div>}
      </div>
      <div className="car-item-info">
        <h3 className="car-item-name">{name}</h3>
        <p className="car-item-description">{truncatedDescription}</p>
        
      
        
        <Link to={`/place-order/${id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarItem;