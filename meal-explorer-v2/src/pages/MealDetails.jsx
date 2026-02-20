import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MealDetails.css';

function MealDetails({ isLiked, onToggleLike }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true); setError('');
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        if (data.meals?.[0]) setMeal(data.meals[0]);
        else setError('Meal not found.');
      } catch { setError('Failed to load meal details.'); }
      finally { setLoading(false); }
    };
    fetchMeal();
  }, [id]);

  const getIngredients = (meal) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const msr = meal[`strMeasure${i}`];
      if (ing?.trim()) list.push({ ingredient: ing.trim(), measure: (msr || '').trim() });
    }
    return list;
  };

  if (loading) return <div className="details-state"><div className="spinner"></div><p>Loading meal details...</p></div>;
  if (error) return <div className="details-state error"><span>⚠️</span><p>{error}</p><button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button></div>;

  const ingredients = getIngredients(meal);
  const instructions = meal.strInstructions || '';
  const shortInstructions = instructions.slice(0, 550);

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to results</button>

      <div className="details-hero">
        <div className="details-img-wrap">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="details-info">
          <div className="details-tags">
            <span className="tag category-tag">🍴 {meal.strCategory}</span>
            {meal.strArea && <span className="tag area-tag">🌍 {meal.strArea}</span>}
          </div>
          <h1 className="details-title">{meal.strMeal}</h1>
          <div className="detail-divider"></div>
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Ingredients</span>
              <span className="meta-value">{ingredients.length} items</span>
            </div>
            {meal.strTags && (
              <div className="meta-item">
                <span className="meta-label">Tags</span>
                <span className="meta-value">{meal.strTags.split(',').slice(0,2).join(', ')}</span>
              </div>
            )}
          </div>
          <button
            className={`like-btn-large ${isLiked(id) ? 'liked' : ''}`}
            onClick={() => onToggleLike(id)}
          >
            {isLiked(id) ? '❤️ Remove from Liked' : '🤍 Add to Liked'}
          </button>
          {meal.strYoutube && (
            <a className="youtube-link" href={meal.strYoutube} target="_blank" rel="noreferrer">
              ▶ Watch Recipe Video
            </a>
          )}
        </div>
      </div>

      <div className="details-body">
        <section className="details-section">
          <h2>Ingredients</h2>
          <div className="ingredients-list">
            {ingredients.map(({ ingredient, measure }, i) => (
              <div className="ingredient-row" key={i}>
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                  alt={ingredient}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="ing-name">{ingredient}</span>
                {measure && <span className="ing-measure">{measure}</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="details-section">
          <h2>Instructions</h2>
          <div className="instructions-text">
            <p>{showFull ? instructions : shortInstructions + (instructions.length > 550 ? '...' : '')}</p>
            {instructions.length > 550 && (
              <button className="show-more-btn" onClick={() => setShowFull(!showFull)}>
                {showFull ? '↑ Show Less' : '↓ Read Full Recipe'}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MealDetails;
