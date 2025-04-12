import React, { useState } from 'react';
import ProvinceSelector from '../components/ProvinceSelector/ProvinceSelector';
import WeatherGrid from '../components/WeatherGrid/WeatherGrid';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Home.css';

function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setShowResults(false);
  };

  const handleFilterClick = () => {
    if (selectedProvince) {
      setShowResults(true);
    }
  };

  const handleCitySelect = (city) => {
    console.log("City clicked:", city);
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="main-title">El Tiempo en Euskadi</h1>
        <ThemeToggle />
      </div>
      
      <div className="controls">
        <ProvinceSelector onProvinceChange={handleProvinceChange} />
        <button 
          className="filter-button" 
          onClick={handleFilterClick}
        >
          Filtrar
        </button>
      </div>

      {showResults && selectedProvince && (
        <WeatherGrid
          cities={selectedProvince.cities}
          province={selectedProvince.name}
          onCityClick={handleCitySelect}
        />
      )}
    </div>
  );
}

export default HomePage;
