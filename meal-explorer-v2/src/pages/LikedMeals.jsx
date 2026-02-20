import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealCard from '../components/MealCard';
import './LikedMeals.css';

function LikedMeals({ likedIds, isLiked, onToggleLike }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedMeals = async () => {
      if (likedIds.length === 0) { setMeals([]); setLoading(false); return; }
      setLoading(true);
      try {
        const fetches = likedIds.map((id) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((r) => r.json())
            .then((data) => data.meals?.[0] || null)
        );
        const results = await Promise.all(fetches);
        setMeals(results.filter(Boolean));
      } catch { setMeals([]); }
      finally { setLoading(false); }
    };
    fetchLikedMeals();
  }, [likedIds]);

  if (loading) return <div className="liked-state"><div className="spinner"></div><p>Loading liked meals...</p></div>;

  return (
    <div className="liked-page">
      <div className="liked-header">
        <h1>Your <span className="accent">Liked</span> Meals</h1>
        {meals.length > 0 && <p>❤️ {meals.length} meal{meals.length !== 1 ? 's' : ''} saved to your collection</p>}
      </div>

      {meals.length === 0 ? (
        <div className="liked-empty">
          <span className="empty-icon">🤍</span>
          <h2>No liked meals yet</h2>
          <p>Start exploring and like meals you want to save</p>
          <button className="go-explore-btn" onClick={() => navigate('/')}>
            Explore Meals →
          </button>
        </div>
      ) : (
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

export default LikedMeals;
