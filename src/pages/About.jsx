import React from 'react';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>Acerca de</h1>
      <div className="about-content">
        <p>
          Esta aplicación muestra el tiempo meteorológico de las principales ciudades de Euskadi.
          Puedes seleccionar una provincia para ver el tiempo de sus ciudades y añadir tus favoritas.
          Con la funcionalidad de la barra de navegación, puedes acceder a la sección de favoritos y a la sección de acerca de.
          Puedes cambiar el tema de la aplicación utilizando el botón de cambio de tema.

        </p>
        <p>
          Los datos meteorológicos son obtenidos de la API de Open-Meteo.
          Los datos son gratis y se actualizan en tiempo real.
        </p>

        <h2>Recurso utilizado</h2>
        <ul>
          <li><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a></li>
        </ul> 

        <h2>Autor</h2>
        <p>
          <a href="https://armanghazi.github.io/portfolio" target="_blank" rel="noopener noreferrer">Arman Ghaziaskari Naeini</a>
        </p>

      </div>

      <ThemeToggle />

    </div>
  );
};

export default About; 