import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../utils/weatherApi';
import { getWeatherIcon } from '../../utils/weatherUtils';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'; 
import './CityDetail.css';

const CityDetail = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(city, true);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del tiempo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  if (loading) {
    return (
      <div className="city-detail">
        <div className="header-controls">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <ThemeToggle />
        </div>
        <div className="loading">Cargando datos del tiempo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="city-detail">
        <div className="header-controls">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <ThemeToggle />
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="city-detail">
      <div className="header-controls">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <ThemeToggle />
      </div>
      
      <h1>{city}</h1>
      
      {weatherData && (
        <div className="weather-info">
          <div className="current-weather">
            <h2>Hoy</h2>
            <div className="weather-card">
              <div className="weather-icon">
                {getWeatherIcon(weatherData.current.weatherCode)}
              </div>
              <div className="temperature">
                <span className="current-temp">{Math.round(weatherData.current.temperature)}°</span>
              </div>
              <div className="description">{weatherData.current.description}</div>
            </div>
          </div>

          <div className="forecast">
            <h2>Pronóstico 7 días</h2>
            <div className="forecast-grid">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-date">{day.date}</div>
                  <div className="weather-icon">
                    {getWeatherIcon(day.weatherCode)}
                  </div>
                  <div className="forecast-temp">
                    <span className="max-temp">{Math.round(day.maxTemp)}°</span>
                    <span className="min-temp">{Math.round(day.minTemp)}°</span>
                  </div>
                  <div className="forecast-description">{day.description}</div>
                  <div className="forecast-precipitation">
                    Prob. lluvia: {day.precipitation}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDetail;