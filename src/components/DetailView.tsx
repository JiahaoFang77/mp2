// src/components/DetailView.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './DetailView.module.css';

// This interface is more detailed to capture all the data for one meal
interface MealDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | null; // Allow string indexing for ingredients
}

const DetailView = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // This effect fetches the meal details whenever the mealId in the URL changes
  useEffect(() => {
    setLoading(true);
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setMeal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  // Logic for Previous/Next buttons
  const allIds: string[] = location.state?.allIds || [];
  const currentIndex = allIds.indexOf(mealId || '');
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/meal/${allIds[currentIndex - 1]}`, { state: { allIds } });
    }
  };

  const handleNext = () => {
    if (currentIndex < allIds.length - 1) {
      navigate(`/meal/${allIds[currentIndex + 1]}`, { state: { allIds } });
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!meal) {
    return <div className={styles.container}>Meal not found.</div>;
  }

  // Helper to parse ingredients since they are in separate properties (strIngredient1, strMeasure1, etc.)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button onClick={handlePrev} disabled={currentIndex <= 0}>
          &larr; Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex >= allIds.length - 1}>
          Next &rarr;
        </button>
      </div>

      <h1 className={styles.title}>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />
      
      <div className={styles.details}>
        <div className={styles.ingredients}>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.instructions}>
          <h3>Instructions</h3>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailView;