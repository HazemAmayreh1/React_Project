import React from 'react';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import  './Navbar.css';
function Navbar() {
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to='/' >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/products'>Products</NavLink>
        </li>
        </ul>
        <ul className='d-flex justify-content-end navbar-nav'>
        <li className="nav-item">
          <NavLink className="nav-link" to='/cart'>CART</NavLink>
        </li>
       <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Account
  </a>
  <ul className="dropdown-menu">
    <li> <NavLink className="dropdown-item" to='/register'>REGSITER</NavLink></li>
    <li> <NavLink className="dropdown-item" to='/login'>LOGIN</NavLink></li>
    <li><hr className="dropdown-divider" /></li>
    <li><NavLink className="dropdown-item" to='/logout'>LOGOUT</NavLink></li>
  </ul>
</li>

</ul>
        
        
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
