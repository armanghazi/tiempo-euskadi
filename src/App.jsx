import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './pages/Footer';
import HomePage from './pages/Home';
import Favorites from './pages/Favorites';
import About from './pages/About';
import CityDetail from './components/CityDetail/CityDetail';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <nav>
            <div className="logo">
              <img src="/euskadi.png" alt="Euskadi" />
              <h3>Pronostico del tiempo del Euskadi</h3>
            </div>

            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/favorites">Favoritos</Link></li>
              <li><Link to="/about">Acerca de</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/city/:city" element={<CityDetail />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;