import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import './SearchPage.css';

function SearchPage({ isLiked, onToggleLike }) {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('a');

  const fetchByLetter = async (letter = 'a') => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch { setError('Failed to fetch meals.'); }
    finally { setLoading(false); }
  };

  const fetchByName = async (name) => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`);
      const data = await res.json();
      setMeals(data.meals || []);
      if (!data.meals) setError(`No meals found for "${name}"`);
    } catch { setError('Failed to fetch meals.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchByLetter('a'); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { setActiveFilter(''); fetchByName(query.trim()); }
  };

  const handleLetterFilter = (letter) => {
    setQuery(''); setActiveFilter(letter); fetchByLetter(letter);
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="search-page">
      <div className="search-hero">
        <span className="hero-eyebrow">✦ Powered by TheMealDB</span>
        <h1>Discover <span className="accent">Delicious</span><br />Meals Worldwide</h1>
        <p>Search thousands of authentic recipes from every corner of the globe</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'Chicken Tikka', 'Pasta', 'Sushi'..."
            className="search-input"
          />
          <button type="submit" className="search-btn">Search →</button>
        </form>
      </div>

      <div className="letter-section">
        <p className="letter-label">or browse by letter</p>
        <div className="letter-filter">
          {alphabet.map((l) => (
            <button
              key={l}
              className={`letter-btn${activeFilter === l ? ' active-letter' : ''}`}
              onClick={() => handleLetterFilter(l)}
              style={activeFilter === l ? {background:'rgba(245,200,66,0.15)', borderColor:'rgba(245,200,66,0.4)', color:'#f5c842'} : {}}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {!loading && meals.length > 0 && (
        <div className="results-header">
          <h2>{activeFilter ? `Meals starting with "${activeFilter.toUpperCase()}"` : `Results for "${query}"`}</h2>
          <span className="results-count">{meals.length} found</span>
        </div>
      )}

      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Finding delicious meals...</p>
        </div>
      )}

      {error && !loading && (
        <div className="state-container error-state">
          <span className="state-icon">🍽️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && meals.length === 0 && (
        <div className="state-container">
          <span className="state-icon">🔍</span>
          <p>No meals found. Try a different search.</p>
        </div>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              isLiked={isLiked(meal.idMeal)}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
