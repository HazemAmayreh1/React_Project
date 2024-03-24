import React, { useState } from 'react';
import styles from './Regsiter.module.css'; 


function Regsiter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fileImage: null,
  });
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className={styles.hero}>
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="emil"
            id="emil"
            name="emil"
            placeholder="Emil"
            value={formData.emil}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="confirm_password"
            onChange={handleChange}
            className={styles.input}
            required
          />
          
          
        </div>
        <div className={styles.inputGroup}>
          <input
            type="file"
            id="file"
            name="file"
            className={styles.fileInput}
            value={formData.fileImage}
            onChange={handleChange}
            required
          />
          <label htmlFor="file" className={styles.fileLabel}>Choose a file</label>
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
    </div>
  );
}

export default Regsiter
