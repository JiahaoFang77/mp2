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

const mealCategories = ['Seafood', 'Vegetarian', 'Chicken', 'Dessert', 'Pasta'];

const GalleryView = () => {
  const [meals, setMeals] = useState<MealPreview[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Seafood'); // Default category

  // This effect runs when 'selectedCategory' changes
  useEffect(() => {
    const fetchMealsByCategory = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setMeals([]);
      }
    };
    
    fetchMealsByCategory();
  }, [selectedCategory]);

  const allMealIds = meals.map(meal => meal.idMeal);

  return (
    <div className={styles.container}>
      <h2>Filter by Category</h2>
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