import React from 'react';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
function Navbar() {
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to='/categories'>Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/products'>Products</NavLink>
        </li>
        </ul>
        <ul className='d-flex justify-content-end navbar-nav'>
        <li className="nav-item">
          <NavLink className="nav-link" to='/register'>REGSITER</NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link" to='/login'>LOG IN</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/cart'>CART</NavLink>
        </li>
        </ul>
        
        
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
