export const getWeatherIcon = (weatherCode) => {
  const weatherIcons = {
    0: '☀️', // Despejado
    1: '🌤️', // Mayormente despejado
    2: '⛅', // Parcialmente nublado
    3: '☁️', // Nublado
    45: '🌫️', // Niebla
    48: '🌫️', // Niebla helada
    51: '🌧️', // Llovizna ligera
    53: '🌧️', // Llovizna moderada
    55: '🌧️', // Llovizna densa
    61: '🌧️', // Lluvia ligera
    63: '🌧️', // Lluvia moderada
    65: '🌧️', // Lluvia fuerte
    71: '🌨️', // Nieve ligera
    73: '🌨️', // Nieve moderada
    75: '🌨️', // Nieve fuerte
    77: '🌨️', // Granizo
    80: '🌧️', // Chubascos ligeros
    81: '🌧️', // Chubascos moderados
    82: '🌧️', // Chubascos fuertes
    85: '🌨️', // Nevadas ligeras
    86: '🌨️', // Nevadas fuertes
    95: '⛈️', // Tormenta
    96: '⛈️', // Tormenta con granizo ligero
    99: '⛈️'  // Tormenta con granizo fuerte
  };
  return weatherIcons[weatherCode] || '❓';
}; 