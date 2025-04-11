import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWeatherData } from '../FetchWeatherData';
import WeatherCard from '../WeatherCard/WeatherCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './CityDetail.css';

const getAqiDescription = (aqi) => {
  if (aqi === 'N/A') return 'N/A';
  
  const aqiValue = parseInt(aqi);
  if (aqiValue <= 50) return 'Buena';
  if (aqiValue <= 100) return 'Moderada';
  if (aqiValue <= 150) return 'No saludable para grupos sensibles';
  if (aqiValue <= 200) return 'No saludable';
  if (aqiValue <= 300) return 'Muy no saludable';
  return 'Peligrosa';
};

const CityDetail = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!weatherData) return null;

  const { current, forecast } = weatherData;

  return (
    <div className="city-detail">
      <div className="header-controls">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h1>{city}</h1>
        <ThemeToggle />
      </div>

      <div className="current-weather">
        <div className="main-info">
          <div className="temperature">
            <span className="temp-value">{Math.round(current.temperature)}°C</span>
            <span className="feels-like">Sensación térmica: {Math.round(current.feelsLike)}°C</span>
            <span className="description">{current.description}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Viento</span>
              <span className="value">{(current.windSpeed)} km/h</span>
            </div>
            <div className="detail-item">
              <span className="label">Humedad</span>
              <span className="value">{Math.round(current.humidity)}%</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Visibilidad</span>
              <span className="value">{current.visibility} km</span>
            </div>
            <div className="detail-item">
              <span className="label">Índice UV</span>
              <span className="value">{Math.round(current.uvIndex)}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Calidad del Aire (ICA)</span>
              <span className={`value aqi-${current.aqi}`}>
                {current.aqi === 'N/A' ? 'N/A' : getAqiDescription(current.aqi)}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Sol</span>
              <span className="value">
                <span className="sun-time">↑ {current.sunrise}</span>
                <span className="sun-time">↓ {current.sunset}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast">
        <h2>Pronóstico 14 días</h2>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-temp">
                <span className="max-temp">{Math.round(day.maxTemp)}°</span>
                <span className="min-temp">{Math.round(day.minTemp)}°</span>
              </div>
              <div className="forecast-description">{day.description}</div>
              <div className="forecast-precipitation">
                Precipitación: {day.precipitation}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
