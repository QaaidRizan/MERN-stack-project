import React from 'react';
import './Home.css';
import Display from '../../components/Display/Display';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Display />
      <Footer />
    </div>
  );
};

export default Home;