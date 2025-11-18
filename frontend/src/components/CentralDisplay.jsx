import { useEffect, useState } from 'react';
import { useHMI } from '../contexts/HMIContext';
import './CentralDisplay.css';

function CentralDisplay() {
  const { state, registerDisplay, dispatchAction, updateState, connected } = useHMI();
  const [activeTab, setActiveTab] = useState('climate');

  useEffect(() => {
    registerDisplay('central');
  }, []);

  const handleVolumeChange = (increment) => {
    dispatchAction({
      type: increment ? 'INCREMENT_VOLUME' : 'DECREMENT_VOLUME'
    });
  };

  const handleTempChange = (increment) => {
    dispatchAction({
      type: increment ? 'INCREMENT_TEMP' : 'DECREMENT_TEMP'
    });
  };

  const handleFanSpeedChange = (speed) => {
    dispatchAction({
      type: 'SET_FAN_SPEED',
      payload: speed
    });
  };

  const handleToggleMedia = () => {
    dispatchAction({ type: 'TOGGLE_MEDIA' });
  };

  const handleSpeedUpdate = (e) => {
    const speed = parseInt(e.target.value);
    dispatchAction({
      type: 'UPDATE_SPEED',
      payload: speed
    });
  };

  return (
    <div className="central-display">
      <div className="central-header">
        <div className={`connection-indicator ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '● Connected' : '○ Disconnected'}
        </div>
        <h2>CENTRAL CONTROL</h2>
        <div className="time">{new Date().toLocaleTimeString()}</div>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'climate' ? 'active' : ''}`}
          onClick={() => setActiveTab('climate')}
        >
          🌡️ Climate
        </button>
        <button
          className={`tab-button ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          🎵 Media
        </button>
        <button
          className={`tab-button ${activeTab === 'vehicle' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicle')}
        >
          🚗 Vehicle
        </button>
      </div>

      <div className="central-content">
        {activeTab === 'climate' && (
          <div className="climate-panel">
            <div className="climate-main">
              <div className="temperature-control">
                <button
                  className="temp-button"
                  onClick={() => handleTempChange(false)}
                >
                  −
                </button>
                <div className="temperature-display">
                  <div className="temp-value">{state.temperature}°C</div>
                  <div className="temp-label">Target Temperature</div>
                </div>
                <button
                  className="temp-button"
                  onClick={() => handleTempChange(true)}
                >
                  +
                </button>
              </div>

              <div className="fan-control">
                <div className="fan-label">Fan Speed</div>
                <div className="fan-buttons">
                  {[0, 1, 2, 3, 4].map((speed) => (
                    <button
                      key={speed}
                      className={`fan-button ${state.fanSpeed === speed ? 'active' : ''}`}
                      onClick={() => handleFanSpeedChange(speed)}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ac-mode">
                <button
                  className={`mode-button ${state.acMode === 'auto' ? 'active' : ''}`}
                  onClick={() => updateState({ acMode: 'auto' })}
                >
                  AUTO
                </button>
                <button
                  className={`mode-button ${state.acMode === 'manual' ? 'active' : ''}`}
                  onClick={() => updateState({ acMode: 'manual' })}
                >
                  MANUAL
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="media-panel">
            <div className="now-playing">
              <div className="album-art">🎵</div>
              <div className="track-info">
                <div className="track-name">{state.currentTrack}</div>
                <div className="track-status">
                  {state.mediaPlaying ? 'Now Playing' : 'Paused'}
                </div>
              </div>
            </div>

            <div className="media-controls">
              <button className="media-button">⏮️</button>
              <button className="media-button play" onClick={handleToggleMedia}>
                {state.mediaPlaying ? '⏸️' : '▶️'}
              </button>
              <button className="media-button">⏭️</button>
            </div>

            <div className="volume-control">
              <button
                className="volume-button"
                onClick={() => handleVolumeChange(false)}
              >
                🔉
              </button>
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.volume}
                  onChange={(e) => updateState({ volume: parseInt(e.target.value) })}
                  className="volume-slider"
                />
                <div className="volume-value">{state.volume}%</div>
              </div>
              <button
                className="volume-button"
                onClick={() => handleVolumeChange(true)}
              >
                🔊
              </button>
            </div>

            <div className="playlist">
              <div className="playlist-item">🎵 Track 1 - Artist Name</div>
              <div className="playlist-item">🎵 Track 2 - Artist Name</div>
              <div className="playlist-item">🎵 Track 3 - Artist Name</div>
            </div>
          </div>
        )}

        {activeTab === 'vehicle' && (
          <div className="vehicle-panel">
            <div className="vehicle-stats">
              <div className="stat-card">
                <div className="stat-icon">⛽</div>
                <div className="stat-info">
                  <div className="stat-label">Fuel Level</div>
                  <div className="stat-value">{state.fuelLevel}%</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🛣️</div>
                <div className="stat-info">
                  <div className="stat-label">Range</div>
                  <div className="stat-value">{state.range} km</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📍</div>
                <div className="stat-info">
                  <div className="stat-label">Trip Distance</div>
                  <div className="stat-value">{state.tripDistance.toFixed(1)} km</div>
                </div>
              </div>
            </div>

            <div className="speed-simulator">
              <div className="simulator-label">Speed Simulator (for testing)</div>
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

            <div className="vehicle-settings">
              <button className="setting-button">⚙️ Settings</button>
              <button className="setting-button">🔧 Diagnostics</button>
              <button className="setting-button">ℹ️ Info</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CentralDisplay;

