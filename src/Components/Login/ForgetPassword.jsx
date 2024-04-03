import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import './ForgetPassword.css'
import Loader from "../../../loader/Loader";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

    const Forget = async () => {
        const token = localStorage.getItem("userToken");
        setLoader(true);
        try {
          const response = await axios.patch(
            `${import.meta.env.VITE_API}/auth/forgotPassword`,
            {
              email,
              password,
              code,
            },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          toast.success("Rest Password Successfully!", {
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
          navigate('/login');
        } catch (error) {
          toast.error("Failed to Rest Password. Please try again.", {
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
          console.error("rest error error:", error);
        } finally {
          setLoader(false);
        }
      };
  return (
    <div className="hero-send-code">
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
      />
      <button onClick={Forget}>Rest</button>
      <div className="alt-action">
        <Link className="nav-link" activeClassName="nav-link-active"to='/login'>I Have Account</Link>
      </div>
    </div>
    </div>
  )
}

export default ForgetPassword
