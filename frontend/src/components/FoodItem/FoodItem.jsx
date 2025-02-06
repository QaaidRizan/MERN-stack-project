import React from "react";
import "./FoodItem.css";
import { Link } from "react-router-dom";

const FoodItem = ({ id, name, description, price, image }) => {
  const maxDescriptionLength = 50; // Adjust this value as needed
  const truncatedDescription = description.length > maxDescriptionLength 
    ? `${description.substring(0, maxDescriptionLength)}...` 
    : description;

  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-item-image" />
      <div className="food-item-info">
        <h3>{name}</h3>
        <p className="food-item-desc">{truncatedDescription}</p>
        <p className="food-item-price">${price.toFixed(2)}</p>
        <Link to={`/place-order/${id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;