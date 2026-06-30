import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { API_URL } from './utils/constants';
import { preloadHeroBanners } from './services/hero.service';

const apiOrigin = new URL(API_URL, window.location.origin).origin;
const apiPreconnect = document.createElement('link');
apiPreconnect.rel = 'preconnect';
apiPreconnect.href = apiOrigin;
document.head.appendChild(apiPreconnect);

preloadHeroBanners();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
