import { useEffect, useState } from 'react';
import { useHMI } from '../contexts/HMIContext';
import './PassengerDisplay.css';

function PassengerDisplay() {
  const { state, registerDisplay, updateState, connected } = useHMI();
  const [activeSection, setActiveSection] = useState('entertainment');

  useEffect(() => {
    registerDisplay('passenger');
  }, []);

  return (
    <div className="passenger-display">
      <div className="passenger-header">
        <div className={`connection-indicator ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '● Connected' : '○ Disconnected'}
        </div>
        <h2>PASSENGER DISPLAY</h2>
        <div className="brightness-control">
          <span>☀️</span>
          <input
            type="range"
            min="20"
            max="100"
            value={state.brightness}
            onChange={(e) => updateState({ brightness: parseInt(e.target.value) })}
            className="brightness-slider"
          />
        </div>
      </div>

      <div className="section-navigation">
        <button
          className={`section-button ${activeSection === 'entertainment' ? 'active' : ''}`}
          onClick={() => setActiveSection('entertainment')}
        >
          🎬 Entertainment
        </button>
        <button
          className={`section-button ${activeSection === 'comfort' ? 'active' : ''}`}
          onClick={() => setActiveSection('comfort')}
        >
          🛋️ Comfort
        </button>
        <button
          className={`section-button ${activeSection === 'info' ? 'active' : ''}`}
          onClick={() => setActiveSection('info')}
        >
          ℹ️ Info
        </button>
      </div>

      <div className="passenger-content">
        {activeSection === 'entertainment' && (
          <div className="entertainment-section">
            <div className="video-player">
              <div className="video-screen">
                <div className="video-placeholder">
                  {state.mediaPlaying ? '▶️' : '⏸️'}
                  <div className="video-title">Video Player</div>
                </div>
              </div>
              <div className="video-controls">
                <button className="video-btn">⏮️</button>
                <button className="video-btn play">
                  {state.mediaPlaying ? '⏸️' : '▶️'}
                </button>
                <button className="video-btn">⏭️</button>
              </div>
            </div>

            <div className="entertainment-grid">
              <div className="entertainment-card">
                <div className="card-icon">🎵</div>
                <div className="card-title">Music</div>
                <div className="card-subtitle">Listen to your favorites</div>
              </div>

              <div className="entertainment-card">
                <div className="card-icon">🎮</div>
                <div className="card-title">Games</div>
                <div className="card-subtitle">Play casual games</div>
              </div>

              <div className="entertainment-card">
                <div className="card-icon">📺</div>
                <div className="card-title">Streaming</div>
                <div className="card-subtitle">Watch shows & movies</div>
              </div>

              <div className="entertainment-card">
                <div className="card-icon">📻</div>
                <div className="card-title">Radio</div>
                <div className="card-subtitle">Listen to live radio</div>
              </div>
            </div>

            <div className="now-playing-info">
              <div className="np-label">Now Playing</div>
              <div className="np-track">{state.currentTrack}</div>
              <div className="np-volume">Volume: {state.volume}%</div>
            </div>
          </div>
        )}

        {activeSection === 'comfort' && (
          <div className="comfort-section">
            <div className="comfort-card large">
              <div className="comfort-header">
                <div className="comfort-icon">🌡️</div>
                <div className="comfort-title">Climate Control</div>
              </div>
              <div className="comfort-content">
                <div className="climate-display">
                  <div className="climate-value">{state.temperature}°C</div>
                  <div className="climate-label">Current Temperature</div>
                </div>
                <div className="climate-info">
                  <div className="info-row">
                    <span>Fan Speed:</span>
                    <span className="info-value">{state.fanSpeed}</span>
                  </div>
                  <div className="info-row">
                    <span>Mode:</span>
                    <span className="info-value">{state.acMode.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="comfort-grid">
              <div className="comfort-card">
                <div className="comfort-icon">💺</div>
                <div className="comfort-title">Seat Heating</div>
                <div className="comfort-actions">
                  <button className="comfort-btn">Off</button>
                  <button className="comfort-btn active">Low</button>
                  <button className="comfort-btn">High</button>
                </div>
              </div>

              <div className="comfort-card">
                <div className="comfort-icon">💨</div>
                <div className="comfort-title">Ventilation</div>
                <div className="comfort-actions">
                  <button className="comfort-btn active">Off</button>
                  <button className="comfort-btn">On</button>
                </div>
              </div>

              <div className="comfort-card">
                <div className="comfort-icon">🌙</div>
                <div className="comfort-title">Ambient Light</div>
                <div className="color-options">
                  <div className="color-dot" style={{ background: '#FF6B6B' }}></div>
                  <div className="color-dot active" style={{ background: '#4ECDC4' }}></div>
                  <div className="color-dot" style={{ background: '#FFE66D' }}></div>
                  <div className="color-dot" style={{ background: '#A8E6CF' }}></div>
                </div>
              </div>

              <div className="comfort-card">
                <div className="comfort-icon">🪟</div>
                <div className="comfort-title">Window Shade</div>
                <div className="comfort-actions">
                  <button className="comfort-btn">Open</button>
                  <button className="comfort-btn active">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'info' && (
          <div className="info-section">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">🚗</div>
                  <div className="info-title">Vehicle Status</div>
                </div>
                <div className="info-details">
                  <div className="detail-row">
                    <span>Speed:</span>
                    <span className="detail-value">{state.currentSpeed} km/h</span>
                  </div>
                  <div className="detail-row">
                    <span>Fuel:</span>
                    <span className="detail-value">{state.fuelLevel}%</span>
                  </div>
                  <div className="detail-row">
                    <span>Range:</span>
                    <span className="detail-value">{state.range} km</span>
                  </div>
                  <div className="detail-row">
                    <span>Trip:</span>
                    <span className="detail-value">{state.tripDistance.toFixed(1)} km</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">📍</div>
                  <div className="info-title">Navigation</div>
                </div>
                <div className="info-details">
                  <div className="destination-info">
                    {state.destination ? (
                      <>
                        <div className="destination">{state.destination}</div>
                        <div className="eta">ETA: {state.eta}</div>
                      </>
                    ) : (
                      <div className="no-destination">No destination set</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">⚙️</div>
                  <div className="info-title">System Info</div>
                </div>
                <div className="info-details">
                  <div className="detail-row">
                    <span>Connection:</span>
                    <span className={`detail-value ${connected ? 'status-ok' : 'status-error'}`}>
                      {connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Brightness:</span>
                    <span className="detail-value">{state.brightness}%</span>
                  </div>
                  <div className="detail-row">
                    <span>Theme:</span>
                    <span className="detail-value">{state.theme}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">🎵</div>
                  <div className="info-title">Media Info</div>
                </div>
                <div className="info-details">
                  <div className="detail-row">
                    <span>Status:</span>
                    <span className="detail-value">
                      {state.mediaPlaying ? 'Playing' : 'Paused'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Volume:</span>
                    <span className="detail-value">{state.volume}%</span>
                  </div>
                  <div className="track-info-display">{state.currentTrack}</div>
                </div>
              </div>
            </div>

            <div className="sync-status">
              <div className="sync-header">🔄 Multi-Display Sync Active</div>
              <div className="sync-description">
                All changes made on any display are synchronized across all connected displays in real-time
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PassengerDisplay;

