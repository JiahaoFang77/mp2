// src/components/Home.tsx
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to The Meal App</h1>
      <p className={styles.subtitle}>
        Use the navigation above to search for meals or browse the gallery.
      </p>
      <img 
        src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" 
        alt="Featured Meal"
        className={styles.image}
      />
    </div>
  );
};

export default Home;