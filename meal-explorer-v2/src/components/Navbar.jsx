import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ likedCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <div className="brand-icon">🍽</div>
        <span className="brand-text">MealExplorer</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
          Search
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Categories
        </NavLink>
        <NavLink to="/liked" className={({ isActive }) => isActive ? 'nav-link nav-liked active' : 'nav-link nav-liked'}>
          <span>Liked Meals</span>
          {likedCount > 0 && <span className="liked-badge">{likedCount}</span>}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
