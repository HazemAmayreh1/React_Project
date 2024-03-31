import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getAllCart();
  }, []);

  const getAllCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`, 
        },
      });
      setCart(data.products);
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  };
  return (
    <div className="cart-body">
      <div className="cart-table">
        <div className="header">
          <div className="header-product">Product</div>
          <div className="header-quantity">Quantity</div>
          <div className="header-subtotal">Subtotal</div>
        </div>
        {cart.map((item) => (
          <div key={item.details.categoryId} className="cart-row">
            <div className="product-info">
              <img src={item.details.mainImage.secure_url} alt={item.details.name} className="product-image" />
              <div>
                <div className="product-name">{item.details.name}</div>
                <div className="product-price">Price: ${item.details.price.toFixed(2)}</div>
                <button className="remove-button">Remove</button>
              </div>
            </div>
            <div className="product-quantity">
              <input type="number" defaultValue={1} min={1} />
            </div>
            <div className="product-subtotal">${item.details.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
