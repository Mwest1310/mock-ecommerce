import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Stores the structure of the application
const App = () => {
  return (
    <div id="app">
        <Header />
        <ToastContainer />
        <Outlet />
        <Footer />
    </div>
  );
};

export default App;