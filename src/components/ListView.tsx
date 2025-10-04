// src/components/ListView.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// We'll also create this CSS module file for styling next
import styles from './ListView.module.css'; 

// It's good practice to define your data structure with an interface
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const ListView = () => {
  // State for the list of meals from the API
  const [meals, setMeals] = useState<Meal[]>([]);
  // State for the user's search query
  const [query, setQuery] = useState('');
  // State for sorting criteria
  const [sortKey, setSortKey] = useState<'strMeal' | 'idMeal'>('strMeal');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // This effect runs whenever the 'query' state changes
  useEffect(() => {
    // We only fetch if the user has typed something
    if (query.trim() === '') {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        setMeals(response.data.meals || []); // API returns null for no results, so default to empty array
      } catch (error) {
        console.error("Error fetching data:", error);
        setMeals([]); // Clear meals on error
      }
    };

    // Debouncing: This is an optimization to prevent API calls on every keystroke.
    // It waits 500ms after the user stops typing before making the API call.
    const delayDebounceFn = setTimeout(() => {
      fetchMeals();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Client-side sorting logic
  const sortedMeals = [...meals].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // This creates an array of all meal IDs to pass to the DetailView
  const allMealIds = sortedMeals.map(meal => meal.idMeal);

  return (
    <div className={styles.container}>
      <h2>Search for a Meal</h2>
      <input 
        type="text"
        placeholder="e.g., Chicken"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchBar}
      />

      <div className={styles.sortControls}>
        <div>
            <span>Sort by: </span>
            <button onClick={() => setSortKey('strMeal')}>Name</button>
            <button onClick={() => setSortKey('idMeal')}>ID</button>
        </div>
        <div className={styles.radioGroup}>
            <label>
            <input 
                type="radio" 
                name="sortOrder" 
                value="asc"
                checked={sortOrder === 'asc'} 
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            />
            <span>Ascending</span>
            </label>
            <label>
            <input 
                type="radio" 
                name="sortOrder" 
                value="desc"
                checked={sortOrder === 'desc'} 
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            />
            <span>Descending</span>
            </label>
        </div>
      </div>

      <ul className={styles.mealList}>
        {sortedMeals.map((meal) => (
          <li key={meal.idMeal}>
            {/* We pass the 'allMealIds' array in the link's state.
              This allows the DetailView to know the entire list for Prev/Next navigation.
            */}
            <Link to={`/meal/${meal.idMeal}`} state={{ allIds: allMealIds }}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <span>{meal.strMeal}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;