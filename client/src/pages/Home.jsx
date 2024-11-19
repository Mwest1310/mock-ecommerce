import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Cta from '../components/Cta';
import { useSelector } from 'react-redux';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div id="home">
      <div className="background" />
        <Hero />
        <Products />
        {!userInfo && <Cta />}
    </div>
  );
};

export default Home;