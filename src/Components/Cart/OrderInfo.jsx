import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../loader/Loader";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavLink } from "react-router-dom";
function OrderInfo() {
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
          console.log(data);
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
      
  return (
    <>
      <h1>order info</h1>
    </>
  )
}

export default OrderInfo
