import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./View.css";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext";

const PlaceOrder = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://splendid-upliftment-production-1cb8.up.railway.app/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Format price and append "M"
  const formatPrice = (price) => {
    return `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price)}M`; // Append "M" directly
  };

  // Format mileage with commas
  const formatMileage = (mileage) => {
    return mileage ? new Intl.NumberFormat('en-US').format(mileage) : 'N/A';
  };

  // Handle next image
  const handleNextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  // Handle previous image
  const handlePrevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return <div className="error-message">{error}</div>;

  return (
    <div className={`place-order ${theme}`}>
      <h2>Car Details</h2>
      {product ? (
        <div className="product-details">
          {/* Updated image container with no padding */}
          <div className="product-image-container no-padding">
            <div className="image-carousel no-padding">
              <button className="carousel-arrow left-arrow" onClick={handlePrevImage}>
                &#8249;
              </button>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="product-image"
              />
              <button className="carousel-arrow right-arrow" onClick={handleNextImage}>
                &#8250;
              </button>
            </div>
            {product.year && <div className="car-year-badge">{product.year}</div>}
          </div>
          
          <div className="product-info">
            {/* Prominent price display above the car name */}
            <div className="car-price-prominent">{formatPrice(product.price)}</div>
            
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Car details not available.</p>
      )}
    </div>
  );
};

export default PlaceOrder;