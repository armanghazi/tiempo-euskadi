import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherData } from '../FetchWeatherData';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './CityDetail.css';
import { getWeatherIcon, getWeatherDescription } from '../../utils/weatherUtils';

const getAqiColorClass = (aqi) => {
  if (aqi === 'N/A') return '';
  const aqiValue = parseInt(aqi);
  if (aqiValue <= 50) return 'aqi-good';
  if (aqiValue <= 100) return 'aqi-moderate';
  if (aqiValue <= 150) return 'aqi-unhealthy-sensitive';
  if (aqiValue <= 200) return 'aqi-unhealthy';
  if (aqiValue <= 300) return 'aqi-very-unhealthy';
  return 'aqi-hazardous';
};

const CityDetail = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="page-title">
        <h1>{city}</h1>
      </div>

      <div className="current-weather">
        <div className="main-info">
          <div className="temperature">
            <span className="weather-icon current-icon">
              {getWeatherIcon(current.weatherCode)}
            </span>
            <span className="temp-value">{Math.round(current.temperature)}°C</span>
            <span className="feels-like">Sensación térmica: {Math.round(current.feelsLike)}°C</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-row">
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="wind">💨</span> Viento</span>
              <span className="value">{(current.windSpeed)} km/h</span>
            </div>
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="humidity">💧</span> Humedad</span>
              <span className="value">{Math.round(current.humidity)}%</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="visibility">👁️</span> Visibilidad</span>
              <span className="value">{current.visibility} km</span>
            </div>
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="uv-index">☀️</span> Índice UV</span>
              <span className="value">{Math.round(current.uvIndex)}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="aqi">🌬️</span> Calidad del Aire (ICA)</span>
              <span className={`value ${getAqiColorClass(current.aqi)}`}>
                {current.aqi}
              </span>
            </div>
            <div className="detail-item">
              <span className="label"><span role="img" aria-label="sun">🌅</span> Sol</span>
              <span className="value">
                <span className="sun-time">↑ {current.sunrise}</span>
                <span className="sun-time">↓ {current.sunset}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast">
        <h2>Pronóstico 15 días</h2>
        <div className="forecast-grid">
          {forecast.slice(1).map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-temp">
                <span className="max-temp">{Math.round(day.maxTemp)}°</span>
                <span className="min-temp">{Math.round(day.minTemp)}°</span>
              </div>
              <div className="weather-info">
                <span className="forecast-icon">{getWeatherIcon(day.weatherCode)}</span>
                <span className="forecast-description">{getWeatherDescription(day.weatherCode)}</span>
              </div>
              <div className="forecast-precipitation">
                Precipitación: {day.precipitation}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Remove this entire block below */}
      {/* <div className={styles.mainWeather}>
        <img 
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className={styles.weatherIcon}
        />
        <div className={styles.temperature}>
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div> */}
            <ThemeToggle />
    </div>
  );
};

export default CityDetail;