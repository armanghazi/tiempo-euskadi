import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../utils/weatherApi';
import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherGrid.css';

const WeatherGrid = ({ cities, province, onCitySelect }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedCities, setFailedCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWeatherData = async () => {
      if (!cities || cities.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setFailedCities([]);
      const newWeatherData = {};
      const newFailedCities = [];

      for (const city of cities) {
        try {
          const data = await fetchWeatherData(city);
          if (data) {
            newWeatherData[city] = data;
          }
        } catch (err) {
          console.error(`Error al cargar datos para ${city}:`, err);
          newFailedCities.push(city);
        }
      }

      setWeatherData(newWeatherData);
      setFailedCities(newFailedCities);
      setLoading(false);
    };

    loadWeatherData();
  }, [cities]);

  // const handleCitySelect = (city) => {
  //   navigate(`/city/${city}`);
  // };

  if (loading) {
    return <div className="loading">Cargando datos del tiempo...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cities || cities.length === 0) {
    return <div className="no-cities">Selecciona una provincia para ver sus ciudades</div>;
  }

  return (
    <div className="weather-grid">
      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          province={province}
          temperature={weatherData[city]?.temperature}
          description={weatherData[city]?.description}
          maxTemp={weatherData[city]?.maxTemp}
          minTemp={weatherData[city]?.minTemp}
          precipitation={weatherData[city]?.precipitation}
          weatherCode={weatherData[city]?.weatherCode}
          onSelect={onCitySelect}
        />
      ))}
      {failedCities.length > 0 && (
        <div className="failed-cities">
          No se pudieron cargar los datos para: {failedCities.join(', ')}
        </div>
      )}
    </div>
  );
};

export default WeatherGrid; 