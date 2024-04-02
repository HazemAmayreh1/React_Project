import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import Loader from "../../../loader/Loader";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavLink } from "react-router-dom";
function Cart() {
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllCart();
  }, []);

  const getAllCart = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCart(data.products);
    } catch (error) {
      toast.error("Failed to fetch cart data:", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Item removed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      getAllCart();
    } catch (error) {
      toast.error("Error removing item from cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };
  const clearAllCart = async () => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Item removed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      getAllCart();
    } catch (error) {
      toast.error("Error removing item from cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };
  const increacQuantity = async (productId, quantity) => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      getAllCart();
    } catch (error) {
      toast.error("Error updating item quantity in cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };
  const decreacQuantity = async (productId, quantity) => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      getAllCart();
    } catch (error) {
      toast.error("Error updating item quantity in cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };
  const handleIncreaseQuantity = (productId, quantity) => {
    increacQuantity(productId, quantity + 1);
  };
  const handleDecreaseQuantity = (productId, quantity) => {
    const newQuantity = Math.max(quantity - 1, 1);
    decreacQuantity(productId, newQuantity);
  };
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        return total + item.details.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    
    <div className="cart-body">
      {loader && <Loader />}
      <div className="cart-table">
        <div className="header">
          <div className="header-product">Product</div>
          <div className="header-quantity">Quantity</div>
          <div className="header-subtotal">Subtotal</div>
        </div>
        {cart.map((item) => (
          <div key={item.details.categoryId} className="cart-row">
            <div className="product-info">
              <img
                src={item.details.mainImage.secure_url}
                alt={item.details.name}
                className="product-image"
              />
              <div>
                <div className="product-name">{item.details.name}</div>
                <div className="product-price">
                  Price: ${item.details.price.toFixed(2)}
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.details._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="product-quantity">
              <button
                onClick={() =>
                  handleDecreaseQuantity(item.details._id, item.quantity)
                }
                className="quantity-adjust-button"
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                className="quantity-input"
                readOnly
              />
              <button
                onClick={() =>
                  handleIncreaseQuantity(item.details._id, item.quantity)
                }
                className="quantity-adjust-button"
              >
                +
              </button>
            </div>
            <div className="product-subtotal">
              ${(item.details.price * item.quantity).toFixed(2)}
            </div>
            
          </div>
        ))}
        {cart.length > 0 && (
           <button className="remove-button" onClick={() => clearAllCart()}>
        Clear All
      </button>
       )}
         
      </div>
      
      <div className="summary-container">
        <h2>Summary</h2>
        <div className="summary-total">
          <span className="summary-total-items">ITEMS {cart.length}</span>
          <span className="summary-total-price">
            TOTAL PRICE ${calculateTotal()}{" "}
          </span>
        </div>
        <NavLink to={`/Order`}>
          {cart.length > 0 && (
            <button className="go-to-order-button">GO TO ORDER</button>
          )}
        </NavLink>
      </div>
    </div>
    
  );
}

export default Cart;
