import React, { useState, useEffect } from 'react';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); setError('');
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch { setError('Failed to load categories.'); }
      finally { setLoading(false); }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="cat-state"><div className="spinner"></div><p>Loading categories...</p></div>;
  if (error) return <div className="cat-state error"><span>⚠️</span><p>{error}</p></div>;

  return (
    <div className="categories-page">
      <div className="categories-header">
        <span className="page-eyebrow">✦ All Categories</span>
        <h1>Explore by <span className="accent">Category</span></h1>
        <p>{categories.length} categories to discover</p>
      </div>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div className="cat-card" key={cat.idCategory}>
            <div className="cat-img-wrap">
              <img src={cat.strCategoryThumb} alt={cat.strCategory} loading="lazy" />
            </div>
            <div className="cat-body">
              <h3>{cat.strCategory}</h3>
              <p className="cat-desc">
                {cat.strCategoryDescription.length > 110
                  ? cat.strCategoryDescription.slice(0, 110) + '…'
                  : cat.strCategoryDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
