import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './pages/Footer';
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
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
