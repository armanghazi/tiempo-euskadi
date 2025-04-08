import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import CityDetail from './components/CityDetail/CityDetail';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/city/:city',
        element: <CityDetail />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
]);

export default router; 