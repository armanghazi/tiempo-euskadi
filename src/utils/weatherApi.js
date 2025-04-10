// Predefined coordinates for Basque cities
export const cityCoordinates = {
  'Bilbao': { latitude: 43.2627, longitude: -2.9253 },
  'Vitoria-Gasteiz': { latitude: 42.8467, longitude: -2.6716 },
  'San Sebastián-Donostia': { latitude: 43.3183, longitude: -1.9812 },
  'Barakaldo': { latitude: 43.2973, longitude: -2.9856 },
  'Getxo': { latitude: 43.3444, longitude: -3.0069 },
  'Irun': { latitude: 43.3386, longitude: -1.7894 },
  'Portugalete': { latitude: 43.3208, longitude: -3.0206 },
  'Santurtzi': { latitude: 43.3289, longitude: -3.0317 },
  'Basauri': { latitude: 43.2356, longitude: -2.8856 },
  'Errenteria': { latitude: 43.3125, longitude: -1.9000 },
  'Sestao': { latitude: 43.3097, longitude: -3.0072 },
  'Galdakao': { latitude: 43.2306, longitude: -2.8456 },
  'Leioa': { latitude: 43.3267, longitude: -2.9833 },
  'Durango': { latitude: 43.1689, longitude: -2.6319 },
  'Eibar': { latitude: 43.1847, longitude: -2.4722 },
  'Orduña': { latitude: 43.0642, longitude: -3.0086 },
  'Zarautz': { latitude: 43.2844, longitude: -2.1717 },
  'Mondragón': { latitude: 43.0647, longitude: -2.4897 },
  'Hernani': { latitude: 43.2661, longitude: -1.9742 },
  'Tolosa': { latitude: 43.1347, longitude: -2.0739 },
  'Oñati': { latitude: 43.0328, longitude: -2.4108 },
  'Laguardia': { latitude: 42.5647, longitude: -2.5661 },
  'Salvatierra': { latitude: 42.8547, longitude: -2.5303 },
  'Laudio': { latitude: 42.9506, longitude: -2.8272 },
  "Irún": { "latitude": 43.3390, "longitude": -1.7894 },
  "Éibar": { "latitude": 43.1849, "longitude": -2.4716 },
  "Rentería": { "latitude": 43.3120, "longitude": -1.8999 },
  "Derio": { "latitude": 43.3054, "longitude": -2.8812 },
  "Bakio": { "latitude": 43.4292, "longitude": -2.8088 },
  "Gernika": { "latitude": 43.3167, "longitude": -2.6833 },
  "Ermua": { "latitude": 43.1833, "longitude": -2.5000 },
  "Amurrio": { "latitude": 43.0500, "longitude": -3.0000 },
  'Londres':     { "latitude": 51.5074, "longitude": -0.1278 },
  'Nueva York':  { "latitude": 40.7128, "longitude": -74.0060 },
  'Los Ángeles': { "latitude": 34.0522, "longitude": -118.2437 },
  'Tokio':       { "latitude": 35.6895, "longitude": 139.6917 },
  'Pekín':       { "latitude": 39.9042, "longitude": 116.4074 },
  'Isfahan':     { "latitude": 32.6539, "longitude": 51.6660 },
  'Roma':        { "latitude": 41.9028, "longitude": 12.4964 },
  'Barcelona':   { "latitude": 41.3851, "longitude": 2.1734 }
};

// Helper function to get weather description
export const getWeatherDescription = (code) => {
  const weatherDescriptions = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla helada',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna densa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve fuerte',
    77: 'Granizo',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos fuertes',
    85: 'Nevadas ligeras',
    86: 'Nevadas fuertes',
    95: 'Tormenta',
    96: 'Tormenta con granizo ligero',
    99: 'Tormenta con granizo fuerte'
  };
  return weatherDescriptions[code] || 'Desconocido';
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Función principal para obtener datos del tiempo
export const fetchWeatherData = async (city, includeForecast = false) => {
  try {
    const coordinates = cityCoordinates[city];
    if (!coordinates) {
      throw new Error('Ciudad no encontrada');
    }

    const { latitude, longitude } = coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMadrid`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener datos del tiempo');
    }

    const data = await response.json();

    const currentWeather = {
      temperature: data.current.temperature_2m,
      description: getWeatherDescription(data.current.weather_code),
      weatherCode: data.current.weather_code
    };

    if (!includeForecast) {
      return currentWeather;
    }

    const forecast = data.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
      maxTemp: data.daily.temperature_2m_max[index],
      minTemp: data.daily.temperature_2m_min[index],
      precipitation: data.daily.precipitation_probability_max[index],
      description: getWeatherDescription(data.daily.weather_code[index]),
      weatherCode: data.daily.weather_code[index]
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

