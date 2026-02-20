import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MealCard.css';

function MealCard({ meal, isLiked, onToggleLike }) {
  const navigate = useNavigate();

  return (
    <div className="meal-card">
      <div className="meal-card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
        <span className="card-category-pill">{meal.strCategory}</span>
        <button
          className={`like-btn overlay-like ${isLiked ? 'liked' : ''}`}
          onClick={() => onToggleLike(meal.idMeal)}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="meal-card-body">
        <h3 className="meal-card-title">{meal.strMeal}</h3>
        <div className="meal-card-actions">
          <button className="btn-view" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
            View Details →
          </button>
          <button
            className={`btn-like ${isLiked ? 'liked' : ''}`}
            onClick={() => onToggleLike(meal.idMeal)}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
