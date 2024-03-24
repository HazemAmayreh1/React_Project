import React from 'react';
import styles from './Banner.module.css'; 
import { NavLink } from 'react-router-dom';

function Banner() {
  return (
    <div className={styles.container}>
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sale 20% Off On Everything</h1>
        <p className={styles.description}>
          Discover exclusive deals and discounts with our seasonal sale. Don't miss out on
          the opportunity to own your favorite items at a fraction of the cost!
        </p>
        <button className={styles.button}><NavLink className="nav-link" to='/products'>Products</NavLink></button>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src="https://theworks.jobs/uploads/hero-images/Head_office_colleague_wearing_yellow.png" alt="Sale Banner" />
      </div>
    </div>
  </div>
  );
}

export default Banner;
