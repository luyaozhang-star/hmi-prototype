import { useHMI } from '../../contexts/HMIContext';
import './VehicleInfoApp.css';

function VehicleInfoApp() {
  const { state, dispatchAction } = useHMI();

  const handleSpeedUpdate = (e) => {
    const speed = parseInt(e.target.value);
    dispatchAction({
      type: 'UPDATE_SPEED',
      payload: speed
    });
  };

  return (
    <div className="vehicle-info-app">
      <div className="app-header">
        <h2>Vehicle Information</h2>
        <p className="app-subtitle">Monitor your vehicle status and diagnostics</p>
      </div>

      <div className="vehicle-info-content">
        <div className="vehicle-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⛽</div>
            <div className="stat-info">
              <div className="stat-label">Fuel Level</div>
              <div className="stat-value">{state.fuelLevel}%</div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${state.fuelLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛣️</div>
            <div className="stat-info">
              <div className="stat-label">Range</div>
              <div className="stat-value">{state.range} km</div>
              <div className="stat-detail">Estimated remaining distance</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-info">
              <div className="stat-label">Trip Distance</div>
              <div className="stat-value">{state.tripDistance.toFixed(1)} km</div>
              <div className="stat-detail">Current trip</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏁</div>
            <div className="stat-info">
              <div className="stat-label">Current Speed</div>
              <div className="stat-value">{state.currentSpeed} km/h</div>
              <div className="stat-detail">Real-time speed</div>
            </div>
          </div>
        </div>

        <div className="speed-simulator">
          <div className="simulator-header">
            <div className="simulator-icon">🎮</div>
            <div>
              <div className="simulator-label">Speed Simulator</div>
              <div className="simulator-description">For testing purposes</div>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="240"
            value={state.currentSpeed}
            onChange={handleSpeedUpdate}
            className="speed-slider"
          />
          <div className="speed-display">{state.currentSpeed} km/h</div>
        </div>

        <div className="vehicle-actions">
          <button className="action-button">
            <span className="action-icon">⚙️</span>
            <span className="action-label">Settings</span>
          </button>
          <button className="action-button">
            <span className="action-icon">🔧</span>
            <span className="action-label">Diagnostics</span>
          </button>
          <button className="action-button">
            <span className="action-icon">ℹ️</span>
            <span className="action-label">Info</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📊</span>
            <span className="action-label">Statistics</span>
          </button>
        </div>

        <div className="vehicle-health">
          <h3 className="health-title">System Health</h3>
          <div className="health-items">
            <div className="health-item ok">
              <span className="health-status">✓</span>
              <span className="health-name">Engine</span>
              <span className="health-badge ok">OK</span>
            </div>
            <div className="health-item ok">
              <span className="health-status">✓</span>
              <span className="health-name">Battery</span>
              <span className="health-badge ok">OK</span>
            </div>
            <div className="health-item ok">
              <span className="health-status">✓</span>
              <span className="health-name">Brakes</span>
              <span className="health-badge ok">OK</span>
            </div>
            <div className="health-item ok">
              <span className="health-status">✓</span>
              <span className="health-name">Tires</span>
              <span className="health-badge ok">OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleInfoApp;

