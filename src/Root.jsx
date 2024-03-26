import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Categories from './Components/Categories/Categories'
import Footer from '../Footer/Footer'

function Root({userName}) {
  return (
    <>
      <Navbar userName={userName}/>
      <Outlet/>
      
     
    </>
  )
}

export default Root
