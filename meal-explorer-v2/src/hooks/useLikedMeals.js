import { useState, useCallback } from 'react';

const STORAGE_KEY = 'meal_explorer_liked';

function getLikedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function useLikedMeals() {
  const [likedIds, setLikedIds] = useState(getLikedIds);

  const isLiked = useCallback((id) => likedIds.includes(String(id)), [likedIds]);

  const toggleLike = useCallback((id) => {
    setLikedIds((prev) => {
      const strId = String(id);
      const next = prev.includes(strId)
        ? prev.filter((i) => i !== strId)
        : [...prev, strId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeLike = useCallback((id) => {
    setLikedIds((prev) => {
      const next = prev.filter((i) => i !== String(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { likedIds, isLiked, toggleLike, removeLike };
}
