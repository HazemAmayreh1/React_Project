import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Navbar.css';
import { UserContext } from '../../../context/User';
import { Slide, toast } from 'react-toastify';
import Loader from "../../../loader/Loader";

function Navbar() {
  const {userName,setUserName,setUserToken,userImage} = useContext(UserContext);
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);
  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    setLoader(true);
    toast.info('You has been logged out.good by', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      onClose: () => navigate('/login') 
      });

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
      <NavLink className="navbar-brand" to="/">
      <img src="https://www.pngitem.com/pimgs/m/448-4483996_bag-transparent-background-shopping-bag-icon-png-png.png" alt="Logo" width={40} height={40} />
      <span className='logoText'>offWhite</span>
  </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mx-auto">
            <NavLink className="nav-item nav-link" aria-current="page" to='/'>Home</NavLink>
            <NavLink className="nav-item nav-link" to='/products'>Products</NavLink>
          </div>
          {
              userName?
              <>
              <ul className='navbar-nav '>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../img/green active .png" alt="green active icon" width={15} height={15} className="active-icon"/>
              {userName}
              </a>
              
              <ul className="dropdown-menu dropdown-menu-end">
              <li><NavLink className="dropdown-item" to='/userprofile'>
                  <i className="bi bi-person"></i>
                  User Profile
                  </NavLink></li>
                <li><NavLink className="dropdown-item" to='/cart'>
                <i className="bi bi-cart"></i>
                  CART
                  </NavLink></li>
                  <li><NavLink className="dropdown-item" to='/myorder'>
                  <i className="bi bi-shop"></i>
                  MY ORDERS
                  </NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" onClick={logout}>
                <i className="bi bi-box-arrow-right"></i>
                LOGOUT
                  </NavLink></li>
              </ul>
            </li>
          </ul>
              </>
              :
              <>
              <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
              <li><NavLink className="dropdown-item" to='/register'>REGISTER</NavLink></li>
              <li><NavLink className="dropdown-item" to='/login'>LOGIN</NavLink></li>
              </ul>
            </li>
          </ul>
              
              </>
            }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
