import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherGrid from '../components/WeatherGrid/WeatherGrid';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);

  const handleCitySelect = (city) => {
    navigate(`/city/${city}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`favorites-page ${darkMode ? 'dark-theme' : ''}`}>
      <div className="favorites-header">
        <h1>Lugares Favoritos</h1>
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      {favorites.length > 0 ? (
        <WeatherGrid cities={favorites} onCitySelect={handleCitySelect} />
      ) : (
        <div className="no-favorites">
          <p>No tienes »Lugares favoritos guardados.</p>
          <p>Añade »Lugares a favoritos desde la página principal.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites; 