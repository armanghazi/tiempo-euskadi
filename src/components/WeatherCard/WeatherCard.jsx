import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeatherIcon } from '../../utils/weatherUtils';
import './WeatherCard.css';

const WeatherCard = ({ 
  city, 
  temperature, 
  description, 
  maxTemp,
  minTemp,
  precipitation,
  weatherCode,
  onSelect 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setIsFavorite(favorites.includes(city));
  }, [city]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the favorite button
    const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter(fav => fav !== city)
      : [...favorites, city];
    
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(city);
    } else {
      navigate(`/city/${city}`);
    }
  };

  return (
    <div className="weather-card" onClick={handleCardClick}>
      <div className="weather-icon">
        {getWeatherIcon(weatherCode)}
      </div>
      <div className="city-name">{city}</div>
      <div className="temperature">
        {temperature !== undefined ? `${Math.round(temperature)}°` : '--'}
      </div>
      <div className="description">{description || '--'}</div>
      {maxTemp !== undefined && minTemp !== undefined && (
        <div className="temperature-range">
          <div className="max-temp">Max: {Math.round(maxTemp)}°</div>
          <div className="min-temp">Min: {Math.round(minTemp)}°</div>
        </div>
      )}
      {precipitation !== undefined && (
        <div className="precipitation">
          Lluvia: {Math.round(precipitation)}%
        </div>
      )}
      <button 
        className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
};

export default WeatherCard;