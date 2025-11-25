import { useEffect, useState } from 'react';
import { useHMI } from '../contexts/HMIContext';
import StatusBar from './central/StatusBar';
import BottomNav from './central/BottomNav';
import NavigationApp from './central/NavigationApp';
import CameraApp from './central/CameraApp';
import SettingsApp from './central/SettingsApp';
import WidgetsContainer from './central/WidgetsContainer';
import Vehicle3D from './central/Vehicle3D';
import './CentralDisplay.css';
import './central/NavigationApp.css';

function CentralDisplay() {
  const { registerDisplay } = useHMI();
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    registerDisplay('central');
  }, []);

  return (
    <div className="central-display">
      <StatusBar />
      
      {/* Home View - Vehicle Image and Widgets */}
      {activeView === 'home' && (
        <div className="home-vehicle-view">
          <div className="home-vehicle-container">
            <Vehicle3D />
          </div>
          <WidgetsContainer setActiveView={setActiveView} />
        </div>
      )}
      
      {/* Navigation App */}
      {activeView === 'navigation' && <NavigationApp key="navigation-map" />}
      
      {/* Camera App */}
      {activeView === 'camera' && <CameraApp />}
      
      {/* Settings App */}
      {activeView === 'settings' && <SettingsApp />}
      
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

export default CentralDisplay;
