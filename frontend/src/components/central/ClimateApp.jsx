import { useHMI } from '../../contexts/HMIContext';
import './ClimateApp.css';

function ClimateApp() {
  const { state, dispatchAction, updateState } = useHMI();

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

  return (
    <div className="climate-app">
      <div className="app-header">
        <h2>Climate Control</h2>
        <p className="app-subtitle">Adjust cabin temperature and air flow</p>
      </div>

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

        <div className="climate-zones">
          <div className="zone-card">
            <div className="zone-icon">👤</div>
            <div className="zone-label">Driver</div>
            <div className="zone-temp">{state.temperature}°C</div>
          </div>
          <div className="zone-card">
            <div className="zone-icon">👥</div>
            <div className="zone-label">Passenger</div>
            <div className="zone-temp">{state.temperature}°C</div>
          </div>
          <div className="zone-card">
            <div className="zone-icon">🧒</div>
            <div className="zone-label">Rear</div>
            <div className="zone-temp">{state.temperature}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClimateApp;

