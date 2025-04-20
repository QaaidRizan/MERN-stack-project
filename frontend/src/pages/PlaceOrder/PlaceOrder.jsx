import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlaceOrder.css";
import axios from "axios";

const PlaceOrder = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="place-order">
      <h2>Place Your Order</h2>
      {product ? (
        <div className="product-details">
          <div className="product-image-container">
            <img
              src={`https://server2-production-1aab.up.railway.app/uploads/${product.image}`}
              alt={product.name}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">
              <strong>Price:</strong> ${product.price ? product.price.toFixed(2) : "N/A"}
            </p>
            
          </div>
        </div>
      ) : (
        <p>Product details not available.</p>
      )}
    </div>
  );
};

export default PlaceOrder;
