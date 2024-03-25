import React, { useState } from "react";
import styles from "./Regsiter.module.css";
import axios from "axios";
import { object, string } from "yup";

function Register() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
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
      setErrors(error.errors);
      return false;
    }
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateData();
    console.log(validate);

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    setUser({
      userName: "",
      email: "",
      password: "",
      image: "",
    });
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/signup`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Sign up</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="userName"
              placeholder="Your Name"
              value={user.userName}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>
        {errors.length > 0
          ? errors.map((error) => <p class="text-danger bg-dark">{error}.</p>)
          : ""}
      </div>
    </div>
  );
}

export default Register;
