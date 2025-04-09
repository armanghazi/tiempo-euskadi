import React from 'react';
import './ProvinceSelector.css';

const provinces = [
  {
    name: "Gipuzkoa",
    cities: ["San Sebastián-Donostia", "Irún", "Éibar", "Tolosa", "Hernani", "Rentería","Errenteria", "Zarautz", "Oñati", "Mondragón"]
  },

    {
    name: "Bizkaia",
    cities: ["Bilbao", "Barakaldo", "Getxo","Orduña","Portugalete", "Durango", "Derio","Bakio","Gernika","Santurtzi", "Basauri", "Sestao", "Galdakao", "Leioa",  "Ermua"]
  },

  {
    name: "Araba",
    cities: ["Vitoria-Gasteiz", "Amurrio", "Laguardia", "Salvatierra", "Laudio"]
  },
  {
    name: "Otras ciudades importantes del mundo",
    cities: ["Londres", "Nueva York", "Los Ángeles", "Tokio", "Pekín", "Isfahan", "Roma", "Barcelona"]
    
  }
];

const ProvinceSelector = ({ onProvinceChange }) => {
  const handleChange = (e) => {
    const selectedProvince = provinces.find(p => p.name === e.target.value);
    if (selectedProvince) {
      onProvinceChange(selectedProvince);
    }
  };

  return (
    <div className="province-selector">
      <div className="select-container">
        <select 
          className="province-select"
          onChange={handleChange} 
          defaultValue=""
        >
          <option value="" disabled>Selecciona una provincia</option>
          {provinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProvinceSelector;
