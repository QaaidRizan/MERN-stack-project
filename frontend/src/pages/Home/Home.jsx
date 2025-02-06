import React from 'react';
import './Home.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header';
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <FoodDisplay />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
