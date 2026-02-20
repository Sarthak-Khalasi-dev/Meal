# 🍽️ Meal Explorer

A full-featured React application for exploring meals using TheMealDB API.

## Features
- 🔍 Search meals by name
- 🔤 Filter meals by first letter (A–Z)
- 📋 View detailed meal information (ingredients, instructions, YouTube link)
- ❤️ Like/Unlike meals (saved to localStorage)
- 📦 View all liked meals on a dedicated page
- 🗂️ Browse all meal categories with descriptions
- 🔢 Live liked count in navbar

## Routes
| Route | Page |
|-------|------|
| `/` | Search Meals |
| `/meal/:id` | Meal Details |
| `/liked` | Liked Meals |
| `/categories` | Categories |

## Setup & Run

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Tech Stack
- **React 18** with functional components
- **React Router v6** (BrowserRouter, Routes, Route, NavLink, useParams, useNavigate)
- **Hooks**: useState, useEffect, useParams, useCallback (custom hook)
- **localStorage** for persisting liked meal IDs
- **TheMealDB API** for all meal data

## Project Structure
```
src/
├── App.jsx                  # Root component + routing
├── App.css                  # Global styles
├── index.js                 # Entry point
├── hooks/
│   └── useLikedMeals.js     # Custom hook for like feature
├── components/
│   ├── Navbar.jsx / .css    # Navigation bar
│   └── MealCard.jsx / .css  # Reusable meal card
└── pages/
    ├── SearchPage.jsx / .css
    ├── MealDetails.jsx / .css
    ├── Categories.jsx / .css
    └── LikedMeals.jsx / .css
```
