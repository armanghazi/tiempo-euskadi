import React, { useState, useEffect } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import { fetchWeatherData } from '../FetchWeatherData';
import './WeatherGrid.css';

const WeatherGrid = ({ cities, province, onCitySelect }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedCities, setFailedCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
          newWeatherData[city] = data;
        } catch (err) {
          console.error(`Error fetching data for ${city}:`, err);
          newFailedCities.push(city);
        }
      }

      setWeatherData(newWeatherData);
      setFailedCities(newFailedCities);
      setLoading(false);
    };

    fetchData();
  }, [cities]);

  // const handleCitySelect = (city) => {
  //   navigate(`/city/${city}`);
  // };

  if (loading) {
    return (
      <div className="weather-grid">
        <div className="loading">Cargando datos del tiempo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-grid">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!cities || cities.length === 0) {
    return (
      <div className="weather-grid">
        <div className="no-cities">Selecciona una provincia para ver el tiempo</div>
      </div>
    );
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