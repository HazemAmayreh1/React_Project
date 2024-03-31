import React, { useState } from "react";
import styles from "./Regsiter.module.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
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
    const RegsiterSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      await RegsiterSchema.validate(user, { abortEarly: false });
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
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true); 
    
    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
  
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formData
        );
        if(data.message=='success'){
          toast.success('account created succesfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });

            navigate('/Login');

        
        }
      } catch (error) {
        if(error.response.status=== 409){
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
            
        }
         else if (error.inner) {
      error.inner.forEach(err => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    } else {
      toast.error("An unexpected error occurred", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
    <div className={styles.hero}>
      <div className={styles.container}>
      
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Sign up</h2>
          <div className={styles.inputGroup}>
          <div className={styles.inputBorder}>
          <label htmlFor="userName" className={styles.insideLabel}>Name</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className={`${styles.input} ${errors.userName ? styles.inputError : ''}`}
            />
            </div>
            {errors.userName && <p className={styles.error}>{errors.userName}</p>}
            <div className={styles.inputBorder}>
            <label htmlFor="email" className={styles.insideLabel}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.userName ? styles.inputError : ''}`}
            />
            </div>
             {errors.email && <p className={styles.error}>{errors.email}</p>}

             <div className={styles.inputBorder}>
             <label htmlFor="password" className={styles.insideLabel}>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.userName ? styles.inputError : ''}`}
            />
            </div>
           {errors.password && <p className={styles.error}>{errors.password}</p>}

           <div className={styles.inputBorder}>
           <label htmlFor="image" className={styles.insideLabel}>file image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className={`${styles.input} ${errors.userName ? styles.inputError : ''}`}
            />
            </div>
           {errors.image && <p className={styles.error}>{errors.image}</p>}
            <button type="submit" className={styles.button} >
            Register{loader && <Loader />} 
            </button>
            
           
          </div>
          <NavLink className={styles.link} aria-current="page" to='/Login'>i have account</NavLink>
        </form>
      
      </div>
    </div>
  );
}

export default Register;
