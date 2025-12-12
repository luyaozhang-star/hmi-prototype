import { useState } from 'react';
import { Typography, Card } from '../../design-system';
import './AppLauncherApp.css';

/**
 * App data for the launcher
 * Each app has an id, name, icon configuration, and optional onClick handler
 */
const apps = [
  {
    id: 'apple-music',
    name: 'Apple Music',
    iconType: 'image',
    iconUrl: '/images/app-icons/apple-music.png',
    gradient: 'linear-gradient(135deg, #FA2D48 0%, #A41225 100%)',
    fallbackIcon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.5 8.5C47.6 8.3 48.6 9.2 48.6 10.3L48.9 44.7C48.9 44.8 48.9 44.9 48.9 45.1C48.9 48.6 45.9 51.5 42.2 51.5C38.5 51.5 35.5 48.6 35.5 45.1C35.5 41.6 38.5 38.7 42.2 38.7C42.8 38.7 43.3 38.8 43.9 38.9V19.7L22.5 23.5V48.4C22.5 48.4 22.5 48.4 22.5 48.5V49.4L22.4 49.4C21.9 52.5 19.2 54.9 15.9 54.9C12.2 54.9 9.2 52 9.2 48.5C9.2 45 12.2 42.1 15.9 42.1C16.5 42.1 17 42.2 17.5 42.3V14.5C17.5 13.6 18.2 12.8 19 12.7L46.5 8.5Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'audible',
    name: 'Audible',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #F8991D 0%, #E67300 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 12C20.954 12 12 20.954 12 32C12 43.046 20.954 52 32 52C43.046 52 52 43.046 52 32C52 20.954 43.046 12 32 12ZM32 18C35.866 18 39 21.134 39 25C39 28.866 35.866 32 32 32C28.134 32 25 28.866 25 25C25 21.134 28.134 18 32 18ZM32 46C26.477 46 21.647 43.085 19 38.7C19.065 35.35 25.333 33.5 32 33.5C38.645 33.5 44.935 35.35 45 38.7C42.353 43.085 37.523 46 32 46Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'ihearts-radio',
    name: 'iHeartsRadio',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #C6002B 0%, #8C001F 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 16C24.268 16 18 22.268 18 30C18 35.332 21.104 39.932 25.6 42.264V48C25.6 49.104 26.496 50 27.6 50H36.4C37.504 50 38.4 49.104 38.4 48V42.264C42.896 39.932 46 35.332 46 30C46 22.268 39.732 16 32 16ZM32 22C33.656 22 35 23.344 35 25C35 26.656 33.656 28 32 28C30.344 28 29 26.656 29 25C29 23.344 30.344 22 32 22ZM32 38C28.688 38 26 35.312 26 32C26 28.688 28.688 26 32 26C35.312 26 38 28.688 38 32C38 35.312 35.312 38 32 38Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #1DB954 0%, #158C40 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10C19.85 10 10 19.85 10 32C10 44.15 19.85 54 32 54C44.15 54 54 44.15 54 32C54 19.85 44.15 10 32 10ZM42.8 41.2C42.4 41.8 41.6 42 41 41.6C35.6 38.4 28.8 37.6 19.8 39.6C19.2 39.8 18.4 39.4 18.2 38.6C18 38 18.4 37.2 19.2 37C29 34.8 36.6 35.8 42.6 39.4C43.4 39.8 43.4 40.6 42.8 41.2ZM45.6 35.2C45 36 44 36.2 43.2 35.6C37 31.8 27.4 30.6 19.2 33C18.2 33.2 17.2 32.6 17 31.6C16.8 30.6 17.4 29.6 18.4 29.4C27.8 26.8 38.4 28.2 45.6 32.6C46.4 33 46.6 34.2 45.6 35.2ZM45.8 29C38.4 24.6 25.2 24.2 17.8 26.4C16.6 26.8 15.4 26 15 24.8C14.6 23.6 15.4 22.4 16.6 22C25.4 19.6 40 20 48.4 25C49.4 25.6 49.8 27 49.2 28C48.6 29 47 29.4 45.8 29Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'zoom',
    name: 'Zoom',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #2D8CFF 0%, #0B5DD6 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 18.686 14.686 16 18 16H36C39.314 16 42 18.686 42 22V32L52 24V40L42 32V42C42 45.314 39.314 48 36 48H18C14.686 48 12 45.314 12 42V22Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    iconType: 'image',
    iconUrl: '/images/app-icons/minecraft.png',
    gradient: 'linear-gradient(135deg, #5D8C3A 0%, #3D5C26 100%)',
    fallbackIcon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="32" height="32" fill="#A0522D"/>
        <rect x="20" y="20" width="8" height="8" fill="#2F4F2F"/>
        <rect x="36" y="20" width="8" height="8" fill="#2F4F2F"/>
        <rect x="28" y="32" width="8" height="8" fill="#2F4F2F"/>
      </svg>
    ),
  },
  {
    id: 'health-score',
    name: 'Health Score',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #355EF3 0%, #33478D 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 14H40V18H44V22H48V38H44V42H40V46H36V50H28V46H24V42H20V38H16V22H20V18H24V14Z" fill="white" fillOpacity="0.1"/>
        <path d="M20 18H24V14H40V18H44V22H20V18Z" fill="white"/>
        <path d="M16 22H20V26H16V22Z" fill="white"/>
        <path d="M44 22H48V26H44V22Z" fill="white"/>
        <path d="M16 26H48V38H44V42H40V46H36V50H28V46H24V42H20V38H16V26ZM24 28V32H28V28H24ZM36 28V32H40V28H36ZM28 36H36V40H28V36Z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'theater',
    name: 'Theater Mode',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #8E38F0 0%, #AA13A7 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18C12 16.9 12.9 16 14 16H50C51.1 16 52 16.9 52 18V38C52 39.1 51.1 40 50 40H14C12.9 40 12 39.1 12 38V18Z" fill="white"/>
        <rect x="16" y="44" width="8" height="4" rx="1" fill="white"/>
        <rect x="28" y="44" width="8" height="4" rx="1" fill="white"/>
        <rect x="40" y="44" width="8" height="4" rx="1" fill="white"/>
      </svg>
    ),
    view: 'theater',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #4A90D9 0%, #2E5A8C 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.867 31.4048L47.891 8.36066C49.28 7.39816 51.163 8.48511 51.024 10.1691L47.115 51.4872C46.943 53.5624 44.11 54.0268 43.285 52.1148L35.452 35.6427C35.102 34.8314 34.262 34.346 33.384 34.4485L14.238 37.0351C12.17 37.2767 11.155 34.5908 14.867 31.4048Z" fill="white"/>
      </svg>
    ),
    view: 'navigation',
  },
  {
    id: 'camera',
    name: 'Camera',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #6B747E 0%, #4A5158 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="16" fill="white" fillOpacity="0.2"/>
        <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="3"/>
        <circle cx="26" cy="28" r="3" fill="white"/>
        <circle cx="32" cy="24" r="5" fill="white" fillOpacity="0.5"/>
      </svg>
    ),
    view: 'camera',
  },
  {
    id: 'settings',
    name: 'Settings',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #6B747E 0%, #4A5158 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.59 52.67H34.4C35.78 52.67 36.73 51.87 37.05 50.5L38.36 44.95C39.28 44.64 40.19 44.28 41.01 43.9L45.86 46.9C47.01 47.64 48.29 47.52 49.22 46.56L52.6 43.21C53.55 42.25 53.69 40.96 52.92 39.79L49.94 34.98C50.31 34.12 50.67 33.25 50.95 32.37L56.54 31.06C57.91 30.74 58.67 29.79 58.67 28.42V23.66C58.67 22.31 57.91 21.38 56.54 21.04L50.99 19.71C50.67 18.76 50.29 17.88 49.98 17.11L52.96 12.22C53.69 11.04 53.61 9.83 52.64 8.86L49.22 5.48C48.25 4.58 47.07 4.38 45.92 5.12L41.01 8.16C40.21 7.76 39.32 7.42 38.36 7.11L37.05 1.5C36.73 0.13 35.78 -0.67 34.4 -0.67H29.59C28.22 -0.67 27.27 0.13 26.95 1.5L25.64 7.07C24.72 7.38 23.81 7.72 22.97 8.14L18.08 5.12C16.93 4.38 15.71 4.54 14.78 5.48L11.36 8.86C10.38 9.83 10.3 11.04 11.04 12.22L14.02 17.11C13.7 17.88 13.33 18.76 13.01 19.71L7.46 21.04C6.11 21.38 5.33 22.31 5.33 23.66V28.42C5.33 29.79 6.11 30.74 7.46 31.06L13.05 32.37C13.33 33.25 13.68 34.12 14.06 34.98L11.08 39.79C10.3 40.96 10.44 42.25 11.4 43.21L14.78 46.56C15.71 47.52 16.99 47.64 18.14 46.9L22.99 43.9C23.83 44.28 24.72 44.64 25.64 44.95L26.95 50.5C27.27 51.87 28.22 52.67 29.59 52.67ZM32 35.11C26.97 35.11 22.87 31.02 22.87 25.99C22.87 20.96 26.97 16.87 32 16.87C37.03 16.87 41.13 20.96 41.13 25.99C41.13 31.02 37.03 35.11 32 35.11Z" fill="white" transform="translate(0, 6)"/>
      </svg>
    ),
    view: 'settings',
  },
  {
    id: 'media',
    name: 'Media',
    iconType: 'gradient',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #C44545 100%)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.5 8.5C47.6 8.3 48.6 9.2 48.6 10.3L48.9 44.7C48.9 44.8 48.9 44.9 48.9 45.1C48.9 48.6 45.9 51.5 42.2 51.5C38.5 51.5 35.5 48.6 35.5 45.1C35.5 41.6 38.5 38.7 42.2 38.7C42.8 38.7 43.3 38.8 43.9 38.9V19.7L22.5 23.5V48.4C22.5 48.4 22.5 48.4 22.5 48.5V49.4L22.4 49.4C21.9 52.5 19.2 54.9 15.9 54.9C12.2 54.9 9.2 52 9.2 48.5C9.2 45 12.2 42.1 15.9 42.1C16.5 42.1 17 42.2 17.5 42.3V14.5C17.5 13.6 18.2 12.8 19 12.7L46.5 8.5Z" fill="white"/>
      </svg>
    ),
    view: 'media',
  },
];

/**
 * AppLauncherApp Component
 * 
 * Displays a grid of application icons that users can click to launch apps.
 * Based on the Figma design mockup for the Entertainment section.
 */
function AppLauncherApp({ setActiveView }) {
  const [hoveredApp, setHoveredApp] = useState(null);

  const handleAppClick = (app) => {
    if (app.view && setActiveView) {
      setActiveView(app.view);
    } else {
      // For external apps, we could open in a new context or show a modal
      console.log(`Launching app: ${app.name}`);
    }
  };

  const renderAppIcon = (app) => {
    if (app.iconType === 'image' && app.iconUrl) {
      return (
        <img 
          src={app.iconUrl} 
          alt={app.name}
          className="app-icon-image"
          onError={(e) => {
            // Fallback to gradient + icon if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="app-launcher">
      <Card className="app-launcher-container" large>
        <div className="app-launcher-grid">
          {apps.map((app) => (
            <button
              key={app.id}
              className={`app-icon-wrapper ${hoveredApp === app.id ? 'hovered' : ''}`}
              onClick={() => handleAppClick(app)}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
              aria-label={`Open ${app.name}`}
            >
              <div 
                className="app-icon"
                style={{ background: app.gradient }}
              >
                {app.iconType === 'image' ? (
                  <>
                    {renderAppIcon(app)}
                    <div className="app-icon-fallback" style={{ display: 'none' }}>
                      {app.fallbackIcon}
                    </div>
                  </>
                ) : (
                  <div className="app-icon-svg">
                    {app.icon}
                  </div>
                )}
              </div>
              <Typography
                variant="body-medium"
                as="span"
                align="center"
                className="app-name"
              >
                {app.name}
              </Typography>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AppLauncherApp;

