import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import Loader from "../../../loader/Loader";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useNavigate } from "react-router-dom";
function Order() {
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrder(data.products);
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
  const calculateTotal = () => {
    return order.reduce((total, item) => {
      return total + (item.details.price * item.quantity);
    }, 0).toFixed(2);
  };
  const placeOrder = async (coupon, phone, address) => {
    const token = localStorage.getItem("userToken");
    setLoader(true);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/order`,
        {
          couponName: coupon,
          phone: phone,
          address: address
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success("Order placed successfully!", {
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
      navigate('/myorder');
    } catch (error) {
      toast.error("Failed to place order. Please try again.", {
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
      console.error("Order placement error:", error);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    placeOrder(coupon, phone, address);
  };
  return (
    <div className="cart-body">
      {loader && <Loader />}
      <div className="cart-table">
        <div className="header">
          <div className="header-product">Product</div>
          <div className="header-subtotal">Subtotal</div>
        </div>
        {order.map((item) => (
          <div key={item.details.categoryId} className="cart-row">
            <div className="product-info">
              <img
                src={item.details.mainImage.secure_url}
                alt={item.details.name}
                className="product-image"
              />
              <div>
                <div className="product-name">{item.details.name}</div>
              </div>
            </div>
            <div className="product-subtotal">
              ${(item.details.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

     
      <div className="order-info-container">
      <div className="total-price">Total Price : ${calculateTotal()}</div>
      <h2>ORDER INFO</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Coupon (Optional)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          maxLength="10"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Order Now</button>
      </form>
    </div>
    </div>
    
  );
}

export default Order;
