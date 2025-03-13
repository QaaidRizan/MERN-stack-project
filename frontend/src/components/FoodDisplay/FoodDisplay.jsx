import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

const FoodDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://food-order-mern-stack-project.onrender.com/api/products");
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
    <div className="food-display">
      <h2>Top Car Near You</h2>
      <div className="food-display-list">
        {products.map((item) => (
          <div key={item.id || item._id} onClick={() => navigate(`/place-order/${item.id || item._id}`)}>
            <FoodItem
              id={item.id || item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={`https://food-order-mern-stack-project.onrender.com/uploads/${item.image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
