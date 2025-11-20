import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens/tokens.css';
import './styles/tokens/typography.css';
import './styles/tokens/theme-dark.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Temporarily disabled StrictMode to prevent double-mounting of map component
  // StrictMode in development mode intentionally double-mounts components to detect side effects
  // This causes MapLibre to initialize twice, creating duplicate map layers
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

