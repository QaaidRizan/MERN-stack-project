import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";  // ✅ Remove extra BrowserRouter
import axios from "axios";
import Home from "./pages/Home/Home";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Navbar from "./components/Navbar/Navbar";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://server2-production-1aab.up.railway.app/api/products/");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>  {/* ✅ This is fine inside App.jsx */}
          <Route path="/" element={<Home />} />
          <Route path="/place-order/:id" element={<PlaceOrder products={products} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
