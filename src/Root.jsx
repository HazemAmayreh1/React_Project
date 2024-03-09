import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Categories from './Components/Categories/Categories'

function Root() {
  return (
    <>
      <Navbar/>
      <Outlet/>
     
    </>
  )
}

export default Root
