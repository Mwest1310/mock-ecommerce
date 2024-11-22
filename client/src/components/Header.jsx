import React, { useEffect, useState } from 'react';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState('false');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  useEffect(() => {
    const checkAdmin = () => {
      if(userInfo) {
        setIsAdmin(userInfo.role==='admin' ? true : false);
      }
      
    }
    checkAdmin();
  }, [userInfo]);
  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (err) {
        console.log(err);
    };
  };
  return (
    <nav id="navbar">
        <ul>
            <li id="logo" className="nav-link"><a href="/">MW</a></li>
            <li className={userInfo ? 'nav-link' : 'hidden'}><a onClick={ logoutHandler }>Log Out</a></li>
            <li className={userInfo ? 'hidden' : 'nav-link'}><a href="/login">Log In</a></li>
            <li className={userInfo ? 'hidden' : 'nav-link'}><a href="/signup">Sign Up</a></li>
            <li id="cart-icon" className={userInfo ? 'nav-link' : 'hidden'}><a href="/cart"><FontAwesomeIcon icon={faBasketShopping} /></a></li>
            <li className={userInfo && isAdmin ? 'nav-link' : 'hidden'}><a href="/dashboard">Dashboard</a></li>
        </ul>
    </nav>
  );
};

export default Header;