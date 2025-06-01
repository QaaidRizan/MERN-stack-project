import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";  // ✅ Remove extra BrowserRouter
import axios from "axios";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PlaceOrder from "./pages/View/View";
import FoodDisplay from "./components/Display/Display";
import { ThemeProvider } from "./Context/ThemeContext";
import Explore from './components/Explore/explore';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  console.log("Products:", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://server2-ygy4.onrender.com/api/products/");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>  {/* ✅ This is fine inside App.jsx */}
          <Route path="/" element={<Home />} />
          <Route path="/place-order/:id" element={<PlaceOrder products={products} />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;