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
        const response = await axios.get(`https://server2-production-1aab.up.railway.app/api/products/${id}`);
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

  // Format price with commas for thousands
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
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
          <div className="product-image-container">
            {/* Image Carousel */}
            <div className="image-carousel">
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
            <div className="car-price-tag">{formatPrice(product.price)}</div>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            
            <div className="car-specs">
              {product.mileage && (
                <div className="car-spec-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>{formatMileage(product.mileage)} miles</span>
                </div>
              )}
              
              {product.transmission && (
                <div className="car-spec-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M12 12h.01"></path>
                  </svg>
                  <span>{product.transmission}</span>
                </div>
              )}
              
              {product.fuelType && (
                <div className="car-spec-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.5 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                  </svg>
                  <span>{product.fuelType}</span>
                </div>
              )}
            </div>
            
            <button className="order-btn">Schedule Test Drive</button>
          </div>
        </div>
      ) : (
        <p>Car details not available.</p>
      )}
    </div>
  );
};

export default PlaceOrder;