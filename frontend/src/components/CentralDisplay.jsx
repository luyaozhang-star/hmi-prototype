import { useEffect, useState } from 'react';
import { useHMI } from '../contexts/HMIContext';
import StatusBar from './central/StatusBar';
import BottomNav from './central/BottomNav';
import './CentralDisplay.css';

function CentralDisplay() {
  const { registerDisplay } = useHMI();
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    registerDisplay('central');
  }, []);

  return (
    <div className="central-display">
      <StatusBar />
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

export default CentralDisplay;
