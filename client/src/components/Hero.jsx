import React from 'react'
import { useSelector } from 'react-redux';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <section id="hero">
        <div className="hero-container">
          <div>
            <h1>Explore our catalogue of products</h1>
            <p>Whether you're looking for some new clothes, to acquire a new device, or whether you simply need a quick stop for stationery, we have you covered.</p>
            <button className="hero-cta"><a href={userInfo ? '/cart' : '/signup'}>Get Started</a></button>
          </div>
        </div>
    </section>
  );
};

export default Hero;