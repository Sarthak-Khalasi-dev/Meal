import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import MealDetails from './pages/MealDetails';
import Categories from './pages/Categories';
import LikedMeals from './pages/LikedMeals';
import { useLikedMeals } from './hooks/useLikedMeals';
import './App.css';

function App() {
  const { likedIds, isLiked, toggleLike } = useLikedMeals();

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar likedCount={likedIds.length} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<SearchPage isLiked={isLiked} onToggleLike={toggleLike} />}
            />
            <Route
              path="/meal/:id"
              element={<MealDetails isLiked={isLiked} onToggleLike={toggleLike} />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/liked"
              element={
                <LikedMeals
                  likedIds={likedIds}
                  isLiked={isLiked}
                  onToggleLike={toggleLike}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
