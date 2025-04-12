import { cityCoordinates, formatDate } from '../utils/weatherApi';
import { getWeatherDescription } from '../utils/weatherUtils';

const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key

export const fetchWeatherData = async (city) => {
  try {
    // Normalize the city name for comparison
    const normalizedCity = city
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/\s+/g, ' '); // Normalize spaces

    // Find the matching city in the coordinates object
    const cityKey = Object.keys(cityCoordinates).find(key => 
      key.toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .replace(/\s+/g, ' ') === normalizedCity
    );

    if (!cityKey) {
      throw new Error(`Ciudad no encontrada: ${city}`);
    }

    const coordinates = cityCoordinates[cityKey];
    const { latitude, longitude } = coordinates;
    
    // Fetch weather data from Open Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,visibility,uv_index` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
      `&forecast_days=16&timezone=auto`;

    // Fetch AQI data from Open Meteo Air Quality API
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?` +
      `latitude=${latitude}&longitude=${longitude}&hourly=us_aqi&timezone=auto`;

    const [weatherResponse, aqiResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(aqiUrl)
    ]);

    if (!weatherResponse.ok) {
      throw new Error('Error al obtener datos del tiempo');
    }

    if (!aqiResponse.ok) {
      console.error('Error al obtener datos de AQI');
    }

    const weatherData = await weatherResponse.json();
    const aqiData = await aqiResponse.json();

    // Get the current AQI value from the hourly data
    const currentAqi = aqiData.hourly?.us_aqi?.[0] || 'N/A';

    const currentWeather = {
      temperature: weatherData.current.temperature_2m,
      feelsLike: weatherData.current.apparent_temperature,
      description: getWeatherDescription(weatherData.current.weather_code),
      weatherCode: weatherData.current.weather_code,
      windSpeed: weatherData.current.wind_speed_10m,
      humidity: weatherData.current.relative_humidity_2m,
      visibility: Math.round(weatherData.current.visibility / 1000), // Convert to km
      uvIndex: weatherData.current.uv_index,
      sunrise: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      aqi: currentAqi
    };

    const forecast = weatherData.daily.time.map((date, index) => ({
      date: formatDate(date),
      maxTemp: weatherData.daily.temperature_2m_max[index],
      minTemp: weatherData.daily.temperature_2m_min[index],
      precipitation: weatherData.daily.precipitation_probability_max[index],
      description: getWeatherDescription(weatherData.daily.weather_code[index]),
      weatherCode: weatherData.daily.weather_code[index],
      sunrise: new Date(weatherData.daily.sunrise[index]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(weatherData.daily.sunset[index]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
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