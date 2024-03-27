import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../loader/Loader";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";

function Login() {
  const {userName,setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [loader,setLoader]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (errors[name]) {
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name]; 
        return updatedErrors;
      });
    }
  };
  const validateData = async () => {
    const LoginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      const fieldErrors = error.inner.reduce((acc, err) => ({
        ...acc,
        [err.path]: err.message,
      }), {});
      setErrors(fieldErrors);
      return false;
    }
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true); 
    
    if (await validateData()) {
      try {
        const {data} = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          {
            email:user.email,
            password:user.password
          }
        );

        if(data.message=='success'){
          toast.success('Login Successfully welcome',{userName},{
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

            localStorage.setItem('userToken',data.token);
            setUserToken(data.token);
            navigate('/');
            console.log({userName});
        
        }
        
      } catch (error) {
          toast.error(error.response.data.message,{
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            
         if (error.inner) {
      error.inner.forEach(err => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
      } finally {
        setLoader(false); 
      }
    } else {
      setLoader(false); 
    }
    
  };
  
  return (
    <div className={styles.loginContainer}>
    <div className={styles.pageBackground}></div>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
          <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
             {errors.email && <p className={styles.error}>{errors.email}</p>}
             </div>
             <div className={styles.formGroup}>
             <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
           {errors.password && <p className={styles.error}>{errors.password}</p>}
           </div>
            <button type="submit" className={styles.submitButton} >
            Login{loader && <Loader />} 
            </button>
        </form>
      
      </div>
    
  );
}

export default Login;
