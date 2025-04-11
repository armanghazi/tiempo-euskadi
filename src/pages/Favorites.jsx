import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherGrid from '../components/WeatherGrid/WeatherGrid';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to update favorites from localStorage
  const updateFavoritesFromStorage = () => {
    try {
      const saved = localStorage.getItem('favoriteCities');
      const parsedFavorites = saved ? JSON.parse(saved) : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      setFavorites([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateFavoritesFromStorage();

    const handleStorageChange = () => {
      updateFavoritesFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCitySelect = (city) => {
    navigate(`/city/${city}`);
  };

  const handleFavoriteToggle = () => {
    updateFavoritesFromStorage();
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Lugares Favoritos</h1>
        <ThemeToggle />
      </div>

      {loading ? (
        <div className="loading">Cargando favoritos...</div>
      ) : favorites.length > 0 ? (
        <WeatherGrid
          cities={favorites}
          onCitySelect={handleCitySelect}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <div className="no-favorites">
          <p>No tienes lugares favoritos guardados.</p>
          <p>Añade lugares a favoritos desde la página principal.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
