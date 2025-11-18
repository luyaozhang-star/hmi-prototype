import { Routes, Route } from 'react-router-dom';
import { HMIProvider } from './contexts/HMIContext';
import ClusterDisplay from './components/ClusterDisplay';
import CentralDisplay from './components/CentralDisplay';
import PassengerDisplay from './components/PassengerDisplay';
import Home from './components/Home';

function App() {
  return (
    <HMIProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cluster" element={<ClusterDisplay />} />
        <Route path="/central" element={<CentralDisplay />} />
        <Route path="/passenger" element={<PassengerDisplay />} />
      </Routes>
    </HMIProvider>
  );
}

export default App;

