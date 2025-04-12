import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container compact">
        <a
          href="https://armanghazi.github.io/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          🌐 Website
        </a>
        <a
          href="https://www.linkedin.com/in/arman-ghaziaskari/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          💼 LinkedIn
        </a>
        <a
          href="https://github.com/armanghazi/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          💻 GitHub
        </a>
        <a
          href="https://www.kaggle.com/armanghazi"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          📊 Kaggle
        </a>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          ©{new Date().getFullYear()} Arman Ghaziaskari Naeini
        </p>
      </div>
    </footer>
  );
};

export default Footer;
