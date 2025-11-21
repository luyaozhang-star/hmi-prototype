import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HMIProvider } from './contexts/HMIContext';
import ClusterDisplay from './components/ClusterDisplay';
import CentralDisplay from './components/CentralDisplay';
import PassengerDisplay from './components/PassengerDisplay';
import Home from './components/Home';
import DesignSystemShowcase from './design-system/showcase/DesignSystemShowcase';

function App() {
  // Apply dark theme by default (automotive HMI standard)
  useEffect(() => {
    document.body.classList.add('theme-dark');
  }, []);

  return (
    <HMIProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cluster" element={<ClusterDisplay />} />
        <Route path="/central" element={<CentralDisplay />} />
        <Route path="/passenger" element={<PassengerDisplay />} />
        <Route path="/design-system" element={<DesignSystemShowcase />} />
      </Routes>
    </HMIProvider>
  );
}

export default App;

