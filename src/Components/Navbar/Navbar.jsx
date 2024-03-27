import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Navbar.css';
import { UserContext } from '../../../context/User';

function Navbar() {
  const {userName,setUserName,setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/login');

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to='/'>ecomerse</NavLink>
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
              <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {userName}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><NavLink className="dropdown-item" to='/cart'>CART</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" onClick={logout}>LOGOUT</NavLink></li>
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
