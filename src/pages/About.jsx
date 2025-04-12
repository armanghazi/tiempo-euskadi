import React from 'react';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>Acerca de</h1>
      <div className="about-content">
        <p>
          Esta aplicación de pronóstico del tiempo ha sido desarrollada utilizando <strong>JavaScript</strong>, <strong>React</strong> y la potente herramienta de construcción <strong>Vite</strong>. Estas tecnologías nos permiten ofrecer una interfaz rápida, moderna y eficiente, diseñada específicamente para brindar la mejor experiencia al usuario.
        </p>
        <p>
          Con esta aplicación, puedes consultar el tiempo meteorológico en tiempo real para las principales ciudades de Euskadi,
          así como de otras ciudades importantes alrededor del mundo. Desde Nueva York hasta Tokio, puedes explorar las previsiones del tiempo
          para las ubicaciones más destacadas del planeta.
        </p>

        <h2>¿Qué tecnologías usamos?</h2>
        <ul>
          <li>
            <strong>React:</strong> Una biblioteca de JavaScript para construir interfaces de usuario rápidas e interactivas.
          </li>
          <li>
            <strong>Vite:</strong> Un entorno de desarrollo moderno para aplicaciones web, enfocado en la velocidad y la simplicidad.
          </li>
          <li>
            <strong>JavaScript:</strong> Lenguaje de programación versátil que permite funcionalidad avanzada y dinámica.
          </li>
          <li>
            <strong>CSS:</strong> Estilo visual atractivo adaptado para dispositivos móviles y temas personalizables.
          </li>
        </ul>

        <h2>Funcionalidades principales</h2>
        <ul>
          <li>Consultar el tiempo actual y el pronóstico para los próximos 15 días.</li>
          <li>Buscar por ciudades o provincias y gestionar tus ubicaciones favoritas.</li>
          <li>Explorar el clima de ciudades importantes en todo el mundo.</li>
          <li>Modo claro y oscuro, ajustado a tus preferencias visuales.</li>
          <li>Datos obtenidos en tiempo real de la API <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>.</li>
        </ul>

        <h2>Sobre el autor</h2>
        <p>
          Esta aplicación fue creada por <a href="https://armanghazi.github.io/portfolio" target="_blank" rel="noopener noreferrer">Arman Ghaziaskari Naeini</a>,
          un estudiante de desarrollo web dedicado a crear soluciones modernas que combinan funcionalidad y diseño, como parte de su proyecto final en Front-End.
        </p>
        <h2>Agradecimiento</h2>
        <p>
          Gracias especiales a <strong>The Bride(BBK Bootcamps)</strong> y <strong>Fundación Novia Salcedo</strong> por darme la oportunidad de aprender desarrollo Front-End. ¡Estoy profundamente agradecido por su apoyo!
        </p>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default About;