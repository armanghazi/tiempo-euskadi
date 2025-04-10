import { cityCoordinates, getWeatherDescription, formatDate } from "../utils/weatherApi.js";

export const fetchWeatherData = async (city, includeForecast = false) => {
  try {
    const coordinates = cityCoordinates[city];
    if (!coordinates) {
      throw new Error('Ciudad no encontrada');
    }

    const { latitude, longitude } = coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMadrid&forecast_days=16`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener datos del tiempo');
    }

    const data = await response.json();

    const currentWeather = {
      temperature: data.current.temperature_2m,
      description: getWeatherDescription(data.current.weather_code),
      weatherCode: data.current.weather_code,
      maxTemp: data.daily.temperature_2m_max[0],
      minTemp: data.daily.temperature_2m_min[0],
      precipitation: data.daily.precipitation_probability_max[0]
    };

    if (!includeForecast) {
      return currentWeather;
    }

    const forecast = data.daily.time.slice(1, 16).map((date, index) => ({
      date: formatDate(date),
      maxTemp: data.daily.temperature_2m_max[index + 1],
      minTemp: data.daily.temperature_2m_min[index + 1],
      precipitation: data.daily.precipitation_probability_max[index + 1],
      description: getWeatherDescription(data.daily.weather_code[index + 1]),
      weatherCode: data.daily.weather_code[index + 1]
    }));

    return {
      current: currentWeather,
      forecast: forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};