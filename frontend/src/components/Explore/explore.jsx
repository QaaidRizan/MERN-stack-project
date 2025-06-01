import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Item/Item";
import axios from "axios";
import "./explore.css";

const Explore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('default');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filters
  const filters = ['All', 'Luxury', 'SUV', 'Sedan', 'Sports'];

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://server2-ygy4.onrender.com/api/products/");
        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  if (loading) return (
    <div className="explore-container">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading vehicles...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="explore-container">
      <div className="error-container">
        <h3>Something went wrong</h3>
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore Our Vehicle Collection</h1>
        <p>Find the perfect car that matches your style and needs</p>
      </div>
      
      <div className="explore-filters">
        {filters.map(filter => (
          <button 
            key={filter} 
            className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="explore-results">
        <p className="results-count">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'vehicle' : 'vehicles'}
        </p>
      </div>
      
      <div className="car-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div 
              key={item.id || item._id} 
              className="car-item-container"
              onClick={() => navigate(`/place-order/${item.id || item._id}`)}
            >
              <Item
                id={item.id || item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                images={item.images}
                year={item.year}
                mileage={item.mileage}
                transmission={item.transmission}
                fuelType={item.fuelType}
              />
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No vehicles found in this category.</p>
            <button onClick={() => setActiveFilter('All')} className="reset-button">
              Show All Vehicles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;