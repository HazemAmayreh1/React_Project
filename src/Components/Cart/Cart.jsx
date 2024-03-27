import React, { useContext } from 'react'
import { UserContext } from "../../../context/User";
function Cart() {
  const {userName} =useContext(UserContext);
  return (
    <div>
      <h2>Cart{userName}</h2>
    </div>
  )
}

export default Cart
