// Import React and CSS module
import React from 'react';
import styles from './Banner.module.css'; // Assume your CSS module is named StoreForChildren.module.css
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.collectionBanner}>
        <h1 className={styles.title}>NEW COLLECTION</h1>
        <p className={styles.subtitle}>There's nothing like new</p>
        <button className={styles.shopButton}><Link className={styles.btnlink} to='/products'>SHOP NEW PRODUCTS</Link></button>
      </div>
      <div className={styles.model}>
      </div>
    </div>
  );
};

export default Banner;
