import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherGrid from '../components/WeatherGrid/WeatherGrid';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Function to update favorites from localStorage
  const updateFavoritesFromStorage = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  };

  useEffect(() => {
    // Initial load of favorites
    updateFavoritesFromStorage();

    // Add event listener for storage changes
    window.addEventListener('storage', updateFavoritesFromStorage);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', updateFavoritesFromStorage);
    };
  }, []);

  const handleCitySelect = (city) => {
    navigate(`/city/${city}`);
  };

  // Function to handle favorite toggle
  const handleFavoriteToggle = () => {
    updateFavoritesFromStorage();
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Lugares Favoritos</h1>
        <ThemeToggle />
      </div>
      
      {favorites.length > 0 ? (
        <WeatherGrid 
          cities={favorites} 
          onCitySelect={handleCitySelect}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <div className="no-favorites">
          <p>No tienes Lugares favoritos guardados.</p>
          <p>Añade Lugares a favoritos desde la página principal.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites; 