# Pronóstico del Tiempo del Euskadi 🌤️

Una aplicación web moderna para consultar el pronóstico del tiempo en las principales ciudades de Euskadi y otras ciudades importantes del mundo.

## 🌟 Características

- 📱 Interfaz moderna y responsive
- 🌙 Modo claro/oscuro
- 🗺️ Pronóstico del tiempo para ciudades de Euskadi
- 🌍 Ciudades importantes de todo el mundo
- ⭐ Sistema de favoritos
- 📊 Datos meteorológicos detallados
- 🎨 Diseño intuitivo y fácil de usar

## 🚀 Tecnologías Utilizadas

- React.js
- Vite
- React Router
- CSS Variables
- Open-Meteo API
- LocalStorage para favoritos

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/armanghazi/tiempo-euskadi.git
```

2. Instala las dependencias:
```bash
cd tiempo-euskadi
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
tiempo-euskadi/
├── public/
│   └── euskadi.png
├── src/
│   ├── components/
│   │   ├── CityDetail/
│   │   ├── ProvinceSelector/
│   │   ├── ThemeToggle/
│   │   └── WeatherGrid/
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Favorites.jsx
│   │   ├── Footer.jsx
│   │   └── Home.jsx
│   ├── utils/
│   │   ├── weatherApi.js
│   │   └── weatherUtils.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🎨 Temas

La aplicación soporta dos temas:
- 🌞 Modo claro
- 🌙 Modo oscuro

Los temas se pueden cambiar usando el botón de tema en la esquina superior derecha.

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:
- 📱 Móviles
- 💻 Tablets
- 🖥️ Escritorio

## 🔄 Funcionalidades Principales

- Selección de provincia para ver ciudades específicas
- Vista detallada del tiempo por ciudad
- Sistema de favoritos para guardar ciudades
- Información meteorológica en tiempo real
- Pronóstico extendido
- Interfaz adaptativa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

- **Arman Ghaziaskari Naeini** - [GitHub](https://github.com/armanghazi)
- **Portfolio** - [armanghazi.github.io/portfolio](https://armanghazi.github.io/portfolio)

## 🙏 Agradecimientos

- The Bride (BBK Bootcamps)
- Fundación Novia Salcedo
- Open-Meteo por su API gratuita
- Comunidad de React

## 🌐 Enlaces

- [Demo en Vercel](https://tiempo-euskadi.vercel.app/)
- [Repositorio en GitHub](https://github.com/armanghazi/tiempo-euskadi)
