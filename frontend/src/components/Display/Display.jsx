import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Display.css";
import Item from "../Item/Item";
import axios from "axios";

const CarDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('default');

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
        const response = await axios.get("https://server2-production-1aab.up.railway.app/api/products/");
        if (Array.isArray(response.data.products)) {
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="car-display">
      <div className="car-display-header">
        <h2>Top Cars Near You</h2>
        <div className="car-display-filters">
          <button className="filter-button active">All</button>
          <button className="filter-button">Luxury</button>
          <button className="filter-button">SUV</button>
          <button className="filter-button">Sedan</button>
          <button className="filter-button">Sports</button>
        </div>
      </div>
      <div className="car-display-list">
        {products.map((item) => (
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
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDisplay;