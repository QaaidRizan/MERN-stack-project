import React from 'react';
import './Home.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <FoodDisplay />
      <Footer />
    </div>
  );
};

export default Home;