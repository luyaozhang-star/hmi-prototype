import { useState } from 'react';
import { useHMI } from '../../contexts/HMIContext';
import { Typography, Card } from '../../design-system';
import './SettingsApp.css';

function SettingsApp() {
  const { state, updateState } = useHMI();
  const [activePage, setActivePage] = useState('graphics');

  const handleQualityChange = (quality) => {
    updateState({ graphicsQuality: quality });
  };

  const handleModelChange = (modelPath) => {
    updateState({ selected3DModel: modelPath });
  };

  const settingsCategories = [
    {
      id: 'graphics',
      title: '3D Scene',
      description: 'Graphics & performance',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27 6.96L12 12.01l8.73-5.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'display',
      title: 'Display',
      description: 'Brightness & appearance',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'audio',
      title: 'Audio',
      description: 'Volume & sound',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'connectivity',
      title: 'Connectivity',
      description: 'Network & Bluetooth',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'vehicle',
      title: 'Vehicle',
      description: 'Vehicle preferences',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17h.01M17 17h.01M5 10l1.5-4.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 10M5 10h14M5 10a2 2 0 0 0-2 2v4h2a2 2 0 1 0 4 0h6a2 2 0 1 0 4 0h2v-4a2 2 0 0 0-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'system',
      title: 'System',
      description: 'Info & updates',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  const qualityOptions = [
    {
      id: 'low',
      label: 'Low Quality',
      description: 'Best performance, minimal resource usage',
      specs: [
        '625 vertices ground plane',
        '2 light sources',
        'No shadows',
        'Standard materials',
        '~60% less GPU usage'
      ],
      icon: '🚀'
    },
    {
      id: 'medium',
      label: 'Medium Quality',
      description: 'Balanced performance and visual quality',
      specs: [
        '2,500 vertices ground plane',
        '4 light sources',
        'Basic shadows',
        'Standard materials',
        '~40% less GPU usage'
      ],
      icon: '⚡'
    },
    {
      id: 'high',
      label: 'High Quality',
      description: 'Maximum visual fidelity',
      specs: [
        '10,000 vertices ground plane',
        '7 light sources',
        'Full quality shadows',
        'Physical-based materials',
        'Full GPU rendering'
      ],
      icon: '✨'
    }
  ];

  const modelOptions = [
    {
      id: 'default',
      path: '/models/vehicle.glb',
      label: 'Range Rover',
      description: 'SUV model',
      icon: '🚗',
    },
    {
      id: 'dodge',
      path: '/models/dodge.glb',
      label: '1968 Dodge Charger',
      description: 'Mid Engine Hellacious F9',
      icon: '🚙',
    },
    {
      id: 'military',
      path: '/models/tpz-fuchs.glb',
      label: 'Military',
      description: 'TPz Fuchs armored vehicle',
      icon: '🪖',
    },
    {
      id: 'macan',
      path: '/models/macan.glb',
      label: 'Porsche Macan',
      description: 'Compact luxury SUV',
      icon: '🚙',
    },
    {
      id: 'sports',
      path: '/models/sports-car.glb',
      label: 'Sports Car',
      description: 'High-performance (coming soon)',
      icon: '🏎️',
      disabled: true
    },
    {
      id: 'truck',
      path: '/models/truck.glb',
      label: 'Pickup Truck',
      description: 'Large pickup (coming soon)',
      icon: '🛻',
      disabled: true
    }
  ];

  // Graphics Page
  const renderGraphicsPage = () => (
    <div className="settings-page">
      <div className="settings-page-header">
        <Typography variant="headline-large" as="h2">3D Scene Settings</Typography>
        <Typography variant="body-medium" className="settings-page-subtitle">
          Adjust graphics quality and performance
        </Typography>
      </div>

      <div className="settings-page-content">
        {/* Graphics Quality Section */}
        <section className="settings-section">
          <div className="section-header">
            <span className="section-icon">🎮</span>
            <div>
              <Typography variant="headline-small" as="h3">Graphics Quality</Typography>
              <Typography variant="body-small" className="section-description">
                Adjust 3D rendering quality to optimize performance
              </Typography>
            </div>
          </div>

          <div className="quality-options">
            {qualityOptions.map((option) => (
              <Card
                key={option.id}
                variant={state.graphicsQuality === option.id ? 'elevated' : 'default'}
                className={`quality-option ${state.graphicsQuality === option.id ? 'active' : ''}`}
                onClick={() => handleQualityChange(option.id)}
              >
                <div className="quality-option-header">
                  <span className="quality-icon">{option.icon}</span>
                  <div className="quality-info">
                    <Typography variant="body-large" className="quality-label">{option.label}</Typography>
                    <Typography variant="body-small" className="quality-description">{option.description}</Typography>
                  </div>
                  <div className="quality-radio">
                    {state.graphicsQuality === option.id && (
                      <div className="radio-selected" />
                    )}
                  </div>
                </div>
                <div className="quality-specs">
                  {option.specs.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <span className="spec-dot">•</span>
                      <Typography variant="body-tiny" as="span">{spec}</Typography>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Vehicle Model Section */}
        <section className="settings-section">
          <div className="section-header">
            <span className="section-icon">🚗</span>
            <div>
              <Typography variant="headline-small" as="h3">Vehicle Model</Typography>
              <Typography variant="body-small" className="section-description">
                Choose which 3D vehicle model to display
              </Typography>
            </div>
          </div>

          <div className="model-options">
            {modelOptions.map((option) => (
              <Card
                key={option.id}
                variant={state.selected3DModel === option.path ? 'elevated' : 'default'}
                className={`model-option ${state.selected3DModel === option.path ? 'active' : ''} ${option.disabled ? 'disabled' : ''}`}
                onClick={() => !option.disabled && handleModelChange(option.path)}
              >
                <div className="model-option-header">
                  <span className="model-icon">{option.icon}</span>
                  <div className="model-info">
                    <div className="model-label-row">
                      <Typography variant="body-large" className="model-label">{option.label}</Typography>
                      {option.disabled && <span className="coming-soon-badge">Soon</span>}
                    </div>
                    <Typography variant="body-small" className="model-description">{option.description}</Typography>
                  </div>
                  <div className="model-radio">
                    {state.selected3DModel === option.path && !option.disabled && (
                      <div className="radio-selected" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Performance Info */}
        <section className="settings-section info-section">
          <div className="section-header">
            <span className="section-icon">📊</span>
            <div>
              <Typography variant="headline-small" as="h3">Performance</Typography>
              <Typography variant="body-small" className="section-description">
                Current system metrics
              </Typography>
            </div>
          </div>

          <div className="info-grid">
            <Card variant="default" compact className="info-card">
              <Typography variant="label-small" className="info-label">Quality</Typography>
              <Typography variant="body-large" className="info-value">
                {state.graphicsQuality.charAt(0).toUpperCase() + state.graphicsQuality.slice(1)}
              </Typography>
            </Card>
            <Card variant="default" compact className="info-card">
              <Typography variant="label-small" className="info-label">Display</Typography>
              <Typography variant="body-large" className="info-value">Central</Typography>
            </Card>
            <Card variant="default" compact className="info-card">
              <Typography variant="label-small" className="info-label">Connection</Typography>
              <Typography variant="body-large" className="info-value">Active</Typography>
            </Card>
            <Card variant="default" compact className="info-card">
              <Typography variant="label-small" className="info-label">Renderer</Typography>
              <Typography variant="body-large" className="info-value">WebGL 2</Typography>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );

  // Placeholder Pages
  const renderPlaceholderPage = (title, description, icon) => (
    <div className="settings-page">
      <div className="settings-page-header">
        <Typography variant="headline-large" as="h2">{title}</Typography>
        <Typography variant="body-medium" className="settings-page-subtitle">
          {description}
        </Typography>
      </div>

      <div className="settings-page-content">
        <div className="placeholder-content">
          <div className="placeholder-icon">{icon}</div>
          <Typography variant="headline-medium" as="h3">Coming Soon</Typography>
          <Typography variant="body-medium" className="placeholder-text">
            {title} settings will be available in a future update.
          </Typography>
        </div>
      </div>
    </div>
  );

  // Render page content based on active page
  const renderPageContent = () => {
    switch (activePage) {
      case 'graphics':
        return renderGraphicsPage();
      case 'display':
        return renderPlaceholderPage('Display Settings', 'Screen brightness and appearance', '🖥️');
      case 'audio':
        return renderPlaceholderPage('Audio Settings', 'Volume and sound preferences', '🔊');
      case 'connectivity':
        return renderPlaceholderPage('Connectivity', 'Bluetooth, Wi-Fi, and network settings', '📡');
      case 'vehicle':
        return renderPlaceholderPage('Vehicle Settings', 'Vehicle-specific preferences', '🚗');
      case 'system':
        return renderPlaceholderPage('System', 'System information and updates', '⚙️');
      default:
        return renderGraphicsPage();
    }
  };

  return (
    <div className="settings-app">
      {/* Sidebar Menu */}
      <nav className="settings-sidebar">
        <div className="sidebar-header">
          <Typography variant="headline-medium" as="h1">Settings</Typography>
        </div>
        <ul className="sidebar-menu">
          {settingsCategories.map((category) => (
            <li key={category.id}>
              <button
                className={`sidebar-menu-item ${activePage === category.id ? 'active' : ''}`}
                onClick={() => setActivePage(category.id)}
              >
                <span className="sidebar-icon">{category.icon}</span>
                <div className="sidebar-text">
                  <Typography variant="body-large" className="sidebar-title">{category.title}</Typography>
                  <Typography variant="body-tiny" className="sidebar-description">{category.description}</Typography>
                </div>
                {activePage === category.id && <span className="sidebar-active-indicator" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="settings-main">
        {renderPageContent()}
      </main>
    </div>
  );
}

export default SettingsApp;
