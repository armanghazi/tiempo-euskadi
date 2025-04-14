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
  'Isfahan':     { "latitude": 32.6539, "longitude": 51.6660 },
  'Roma':        { "latitude": 41.9028, "longitude": 12.4964 },
  'Lyon': { latitude: 45.75, longitude: 4.85 },
  'Palma de Mallorca': { latitude: 39.5696, longitude: 2.6502 }
};



// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Export the fetchWeatherData function from FetchWeatherData.jsx
export { fetchWeatherData } from '../components/FetchWeatherData';

