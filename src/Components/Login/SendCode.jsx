import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './SendCode.css'
import Loader from "../../../loader/Loader";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useNavigate } from "react-router-dom";

function SendCode() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

    const sentcode = async () => {
        const token = localStorage.getItem("userToken");
        setLoader(true);
        try {
          const response = await axios.patch(
            `${import.meta.env.VITE_API}/auth/sendcode`,
            {
              email,
            },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          toast.success("send code successfully!", {
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
           navigate('/forgetpassword');
        } catch (error) {
          toast.error("Failed to send code. Please try again.", {
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
          console.error("code error:", error);
        } finally {
          setLoader(false);
        }
      };
  return (
    <>
    <div className="hero-send-code">
  <div className="forget-password-container">
      <h2>Forget Password</h2>
      <p>Please Enter email to send code</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="email-input"
      />
      <button onClick={sentcode} className="send-code-button">
        Send Code
      </button>
    </div>
    </div>
    </>
  )
}

export default SendCode
