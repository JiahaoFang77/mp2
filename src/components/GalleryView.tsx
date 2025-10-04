// src/components/GalleryView.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './GalleryView.module.css';

// The API for filtering returns a slightly different structure
interface MealPreview {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const mealCategories = ['All', 'Seafood', 'Vegetarian', 'Chicken', 'Dessert', 'Pasta'];

const GalleryView = () => {
  const [meals, setMeals] = useState<MealPreview[]>([]);
  // Set the default category to "All"
  const [selectedCategory, setSelectedCategory] = useState('All'); 

  useEffect(() => {
    const fetchMeals = async () => {
      // 2. Change the API endpoint based on the selected category
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      if (selectedCategory === 'All') {
        // Use the search endpoint to get a general list of meals for the "All" category
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      
      try {
        const response = await axios.get(url);
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setMeals([]);
      }
    };
    
    fetchMeals();
  }, [selectedCategory]);

  const allMealIds = meals.map(meal => meal.idMeal);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Filter by Category</h2>
        <Link to="/" className={styles.backButton}>&larr; Back to Home</Link>
      </div>
      <div className={styles.filterControls}>
        {mealCategories.map(category => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            // Add a class if this is the currently selected button
            className={selectedCategory === category ? styles.active : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.galleryGrid}>
        {meals.map(meal => (
          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} className={styles.galleryItem} state={{ allIds: allMealIds }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className={styles.mealName}>{meal.strMeal}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;