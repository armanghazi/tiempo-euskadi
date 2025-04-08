import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeatherIcon } from '../../utils/weatherUtils';
import './WeatherCard.css';

const WeatherCard = memo(({
    city,
    temperature,
    description,
    maxTemp,
    minTemp,
    precipitation,
    onSelect,
    weatherCode
}) => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('favoriteCities');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
            // Consider showing a user-friendly message here
        }
    }, []);

    const toggleFavorite = useCallback((e, city) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = prev.includes(city)
                ? prev.filter(fav => fav !== city)
                : [...prev, city];
            try {
                localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
                // Consider showing a user-friendly message here, e.g.:
                // alert('Failed to save favorite.  Your favorites may not be saved.');
            }
            return newFavorites;
        });
    }, []);

    const handleClick = useCallback(() => {
        if (onSelect) {
            onSelect(city);
        } else {
            navigate(`/city/${city}`);
        }
    }, [city, navigate, onSelect]);

    const isFavorite = favorites.includes(city);

    return (
        <div className="weather-card" onClick={handleClick} role="button" tabIndex={0}>
            <div className="weather-card-header">
                <h3>{city}</h3>
                <button
                    className={`favorite-button ${isFavorite ? 'favorite-button-active' : ''}`}
                    onClick={(e) => toggleFavorite(e, city)}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>

            {temperature !== undefined && (
                <div className="temperature">
                    <span className="current-temp">{Math.round(temperature)}°</span>
                </div>
            )}

            {description && (
                <div className="description">{description}</div>
            )}

            {(maxTemp !== undefined || minTemp !== undefined) && (
                <div className="temperature-range">
                    <span className="max-temp">Max: {Math.round(maxTemp)}°</span>
                    <span className="min-temp">Min: {Math.round(minTemp)}°</span>
                </div>
            )}

            {precipitation !== undefined && (
                <div className="precipitation">
                    <span>Prob. lluvia: {precipitation}%</span>
                </div>
            )}

            <div className="weather-icon">
                {getWeatherIcon(weatherCode)}
            </div>
        </div>
    );
});

WeatherCard.displayName = 'WeatherCard';

export default WeatherCard;