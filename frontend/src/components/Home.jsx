import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🚗 HMI Multi-Display Prototype</h1>
        <p className="subtitle">Select a display to view</p>
        
        <div className="display-grid">
          <button 
            className="display-card cluster"
            onClick={() => navigate('/cluster')}
          >
            <div className="card-icon">📊</div>
            <h2>Cluster Display</h2>
            <p>Speedometer, fuel, and vehicle info</p>
          </button>

          <button 
            className="display-card central"
            onClick={() => navigate('/central')}
          >
            <div className="card-icon">🎛️</div>
            <h2>Central Display</h2>
            <p>Main control interface</p>
          </button>

          <button 
            className="display-card passenger"
            onClick={() => navigate('/passenger')}
          >
            <div className="card-icon">🎬</div>
            <h2>Passenger Display</h2>
            <p>Entertainment and info</p>
          </button>
        </div>

        <div className="instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Open each display in a separate browser window/tab</li>
            <li>Drag windows to different monitors if available</li>
            <li>Interact with any display and see changes reflected across all displays</li>
          </ol>
          
          <div className="quick-links">
            <a href="/cluster" target="_blank" rel="noopener noreferrer">
              Open Cluster ↗
            </a>
            <a href="/central" target="_blank" rel="noopener noreferrer">
              Open Central ↗
            </a>
            <a href="/passenger" target="_blank" rel="noopener noreferrer">
              Open Passenger ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

